import adminModel from 'api/modules/models/admin.model'
import { hashPassword, validatePassword } from 'api/middleware/security'
import jwt from 'api/middleware/jwt'

export const signUp = async (req, res) => {
    try { 
        const { email, password, role } = req.body

      /*   const user = await adminModel.findOne({ email })
        if (user) return res.error('Email is already taken', 500)

        const hashedPassword = await hashPassword(password)
        const body = Object.assign(req.body, {
            password: hashedPassword,
            role: role,
        })
        const newUser = new adminModel(body)
        const accessToken = jwt.sign({ userId: newUser._id })
        newUser.accessToken = accessToken

        await newUser.save()
        res.success(newUser) */
    } catch (error) {
        res.error(error.message, error.status)
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await adminModel.findOne({ email })
     
        if (!user) return res.error('Email does not exist', 401)

        const validPassword = await validatePassword(password, user.password)
        if (!validPassword)
            return res.error('Email or password is not correct', 401)

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            {
                expiresIn: '1d',
            }
        )

        // persist the token as 't' in cookie with expire date
        res.cookie('t', accessToken, { expire: 24 * 60 * 60 * 1000 })

        let data = {
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
            accessToken,
        }
        res.success(data,200)
    } catch (error) {
        res.error(error.message, error.status)
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie('t')
        res.success({
            message: 'Logout successfully',
        })
    } catch (error) {
        res.error(error.message, error.status)
    }
}

export const session = async (req, res, next) => {
    const { userId } = req.decoded

    const user = await adminModel.findById(userId)
    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1d',
    })

    // persist the token as 't' in cookie with expire date
    res.cookie('t', accessToken, { expire: 24 * 60 * 60 * 1000 })

    let data = {
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        },
        accessToken,
    }
    res.success(data)

    // res.json(currentUser)
}

