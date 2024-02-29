import adminModel from 'api/modules/models/admin.model'
import { sign, verify } from 'api/middleware/jwt'
import config from '../../../configs/app'
const secretKey = config.jwt_secret_key

export const signUp = async (req, res) => {
    try { 
        const { email, password, role } = req.body
        const user = await adminModel.findOne({ email })
        if (user) return res.error('Email is already taken', 500)

        const newUser = new adminModel(req.body)
        const accessToken = sign({ userId: newUser._id },secretKey,{ expiresIn: '1d'})
        await newUser.save()
        let data = {
            message : "Register Success",
            accessToken,
        }
        res.success(data, 201) 
    } catch (error) {
        res.error(error.message, error.status)
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await adminModel.findOne({ email })
     
        if (!user) return res.error('Email does not exist', 401)

        const validPassword = await user.comparePassword(password, user.password)

        if (!validPassword) return res.error('Email or password is not correct', 401)

        const accessToken = sign({ userId: user._id },secretKey,{ expiresIn: '1d'})

        res.cookie('t', accessToken, { expire: 24 * 60 * 60 * 1000 })

        let data = {
            message : "Login Sucess",
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
        res.success({ message: 'Logout successfully' })
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

