<script>
import Layout from '@layouts/default'
import { authMethods } from '@state/helpers'
import appConfig from '@src/app.config'

export default {
  page: {
    title: 'Privacy Notice',
    meta: [
      { name: 'description', content: `Privacy Notice to ${appConfig.title}` },
    ],
  },
  components: { Layout },
  data() {
    return {
      checkbox: false,
    }
  },
  computed: {},
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      this.tryingToReset = true
      // Reset the authError if it existed.
      this.error = null
      return this.resetPassword({
        email: this.email,
      })
        .then((data) => {
          this.tryingToReset = false
          this.isResetError = false
          this.isSuccess = true
          this.successMessage = data.message
        })
        .catch((error) => {
          this.tryingToReset = false
          this.error = error ? error.response.data.message : ''
          this.isResetError = true
          this.isSuccess = false
        })
    },
  },
}
</script>

<template>
  <div class="account-pages ">
    <div class="row justify-content-center">
      <div class="col-md-12 col-xl-10">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <h5>Privacy Notice</h5>
              <p
                >This Privacy Notice describes how Muaythai Irarin application
                (“Our”) and/or Muaythaiiyarin Co. Ltd. (collectively “Muaythai
                Iyarin” or “We”) collect and process your personal information
                through our websites, products, services, online store and
                applications that reference this Privacy Notice (collectively “
                Services”). By using our Services, you are consenting to the
                practices described in this Privacy Notice. Our business changes
                constantly, and our Privacy Notice will change also. We reserves
                the right to change and update this privacy notice at any time
                without notice to you. The details of the update will be posted
                on our application. You should check our websites or application
                frequently to see recent changes.
              </p>
              <p>In this Privacy Notice:</p>

              <p
                ><b>Personal information</b> means any information about you as
                an user of Muaythai Iyarin, or any information relating to a
                person, which can be used to identify a specific person, whether
                by a direct or indirect mean, but not including the information
                of the deceased persons or anonymized information, including but
                not limited to registration information (e.g., name, email
                address), payment information, location information, device
                information, biometric identifiers or information, IP address,
                and your activities (including viewing and search history), but
                does not include content that you upload (except to the extent
                the content contains personal information about you).
              </p>
              <p
                ><b>Cookies</b> means a small text file considering of data
                parts from a download activity that may be stored in a web
                browser you use to access websites or applications. Cookies data
                may be saved on your computer devices or any communication tools
                that you use to access the web browser while you visit our
                website and applications.
              </p>
              <p>
                <b>What Personal Information do we collect?</b>
              </p>
              <p>
                We collect your personal information in order to provide and
                continually improve our product and services. We will collect
                your personal information as necessary for lawful purposes. We
                may receive personal information through both direct and
                indirect means which can be from social media, other service
                providers
              </p>
              <p><b>Purposes of our use your personal information</b></p>
              <p
                >We use your personal information to operate, provide, develop,
                and improve the products and services that we offer our
                customers. These purposes include:</p
              >
              <p style="margin-left:2.5em;"
                ><b>Purchase and delivery of products and services. </b>We use
                your personal information to take and handle orders, deliver
                products and services, process payments, and communicate with
                you about orders, products and services, and promotional offers.
                <br /><b>Provide, troubleshoot, and improve our Services. </b>We
                use your personal information to provide functionality, analyze
                performance, fix errors, and improve the usability and
                effectiveness of our Services. We may use cookie as a tool to
                collect IP address, the type of web browser used to access
                website or application. <br /><b
                  >Recommendations and personalization. </b
                >We use your personal information to recommend features,
                products, and services that might be of interest to you,
                identify your preferences, and personalize your experience with
                our Services. <br /><b>Comply with legal obligations. </b>In
                certain cases, we collect and use your personal information to
                comply with laws. For instance, we collect from sellers
                information regarding place of establishment and bank account
                information for identity verification and other purposes.
                <br /><b>Communicate with you. </b>We use your personal
                information to communicate with you in relation to our Services
                via different channels (e.g., by phone, e-mail, chat). <br /><b
                  >Fraud Prevention and Credit Risks. </b
                >We use personal information to prevent and detect fraud and
                abuse in order to protect the security of our customers, and
                others. We may also use scoring methods to assess and manage
                credit risks.
              </p>
              <p><b>Sensitive data/information </b></p>
              <p>
                Sensitive data/information such as information related to race,
                religion, health information, sexual orientation, criminal
                records and etc. We do not collect sensitive information unless
                it is provided by you for the provision of services or products
                or to facilitate you or unless it is required to do so in
                accordance to applicable laws. In the event that we have
                accidentally received other sensitive information and have no
                intention to collect such information, we will not further
                process it.
              </p>
              <p><b>Are Children Allowed to Use our Services?</b></p>
              <p>
                We do not sell products for purchase by children. We sell
                children's products for purchase by adults. If you are under 20
                years old or a minor under the applicable laws, including but
                not limited to their native country, the country of the access
                to our website or application, you may use our Services only
                with the involvement of a parent or guardian. For Minor,
                parental consent or control is required at all time while using
                our website or application. We do not intent to collect, use,
                process any PII or personal information of anyone is considered
                as a minor. We do not knowingly collect personal information
                from children under the age of 20 without the consent of the
                child's parent or guardian.
              </p>
              <p><b>Period of information retention</b></p>
              <p>
                We will retain your personal information for provision of
                Services to you under the Terms of Use and under this Privacy
                Notice. However, you have the right to inform us of your
                intention to erase your information at any time.
              </p>
              <p><b>Sharing your personal information</b></p>
              <p>
                Information about our customers is an important part of our
                business, and we are not in the business of selling our
                customers’ personal information to others. We share customers’
                personal information only as described below.
              </p>
              <p><b>Transactions involving Third Parties</b></p>
              <p>
                We make available to you services, products, applications, or
                skills provided by third parties for use on or through our
                Services. For example, you can order products from third parties
                through our stores, download applications from third-party
                application providers from App Stores. You can tell when a third
                party is involved in your transactions, and we share customers’
                personal information related to those transactions with that
                third party.
              </p>
              <p style="margin-left:2.5em;"
                ><b>Third-Party Service Providers: </b>We employ other companies
                and individuals to perform functions on our behalf. Examples
                include fulfilling orders for products or services, delivering
                packages, sending postal mail and e-mail, removing repetitive
                information from customer lists, analyzing data, providing
                marketing assistance, providing search results and links
                (including paid listings and links), processing payments,
                transmitting content, scoring, assessing and managing credit
                risk, and providing customer service. These third-party service
                providers have access to personal information needed to perform
                their functions, but may not use it for other purposes. <br /><b
                  >Protection: </b
                >We release account and other personal information when we
                believe release is appropriate to comply with the law; enforce
                or apply our Terms of Use and other agreements; or protect the
                rights, our safety, our users, or others. This includes
                exchanging information with other companies and organizations
                for fraud protection and credit risk reduction.
              </p>
              <p>
                Other than as set out above, you will receive notice when
                personal information about you might be shared with third
                parties, and you will have an opportunity to choose not to share
                the information.
              </p>
              <p><b>Third-Party Advertisers and Links to Other Websites</b></p>
              <p>
                We may include third-party advertising and links to other
                websites and apps. Third-party advertising partners may collect
                information about you when you interact with their content,
                advertising, and services. Such Third-Party Ads and Links are
                not under our control, and we are not responsible for any
                Third-Party Ads and Links. We provide access to those only as
                for a convenience to you, and we do not review, approve,
                monitor, endorse, warrant, or make any representations with
                respect to Third-Party Ads and Links. You use all Third-Party
                Ads and Links at your own risk and should apply a suitable level
                of caution and discretion in doing so. When you click on any of
                the Third-Party Ads and Links, the applicable third-party’s
                terms and policies apply, including the third-party’s privacy
                and data gathering practices. You should make whatever
                investigation you feel necessary or appropriate before
                proceeding with any transaction in connection with them.
              </p>
              <p style="margin-left:2.5em;">
                We will never share your name or other information that directly
                identifies you to them However, we use an advertising identifier
                like a cookie or other device identifier. For example, if you
                have already downloaded one of our apps, we will share your
                advertising identifier and information about that event so that
                you will not be served an ad to download the app again. Some ad
                companies also use this information to serve you relevant ads
                from other advertisers. You can learn more about how to opt-out
                of interest-based advertising by going to the Preference page.
              </p>
              <p><b>Marketing Choices</b></p>
              <p>
                You have control regarding our use of Personal information for
                direct marketing. You will need to expressly consent before
                receiving marketing. You can choose to not receive such
                communications at any time. If you no longer wish to receive any
                marketing communications, remain on a mailing list to which you
                previously subscribed, or receive any other marketing
                communication, please follow the unsubscribe link in the
                relevant communication or contact us.
              </p>
              <p><b>Cross-Border Data Transfers</b></p>
              <p>
                We transfer Personal information to jurisdictions as necessary
                for the purposes described above, including to jurisdictions
                that may not provide the same level of data protection as your
                home country. In particular, our website or application and
                Services are hosted on servers in the Republic of Singapore. The
                transfer of Personal information is necessary to provide you
                with the requested information and/or to perform any requested
                transaction. When you submit personal information to us you are
                transferring your data across borders.
              </p>
              <p><b>Your rights under our Privacy Notice</b></p>
              <p style="margin-left:2.5em;">Right of access </p>
              <p style="margin-left:2.5em;">
                You have the right to obtain our confirmation from us as to
                whether or not your concerning personal information are being
                processed and as the case may be you may be able to access your
                information including the purposes of processing, the categories
                of your information concerned, the recipient to whom your
                personal information have been or will be disclosed, the period
                that your information will be stored, the right to request us
                for rectification or erasure of your information. You can access
                your information, including but not limited to your name,
                address, payment options, profile information, membership, your
                preference and purchase history by logging in to your account or
                contacting our “Customer Service” on our website or application.
              </p>
              <p style="margin-left:2.5em;">Right to rectification</p>
              <p style="margin-left:2.5em;">
                You shall have right to obtain from us the rectification of your
                inaccurate personal information as well as the right to have
                incomplete personal information completed by providing a
                supplemental statement
              </p>
              <p style="margin-left:2.5em;">Right to erasure </p>
              <p style="margin-left:2.5em;">
                You shall have the right to obtain from us the erasure of your
                personal information where your personal information is no
                longer necessary in relation to the purposes they were collected
                or processed, where you withdraw your consents or where the
                processing is unlawful.
              </p>
              <p style="margin-left:5em;">
                The accuracy of your information is contested (for the period
                which enabling us to verify the accuracy of your information;
              </p>
              <p style="margin-left:5em;"
                >The processing of your information is unlawful;</p
              >
              <p style="margin-left:5em;"
                >Our processing of your information is no longer required.</p
              >
              <p style="margin-left:2.5em;">
                Remark: in case the law requires us to process such information,
                we may use it again for the litigation claims or for another’s
                protection.
              </p>
              <p style="margin-left:2.5em;">Right to data portability</p>
              <p style="margin-left:2.5em;">
                You are entitled to receive your information which has been
                provided to us in structured, commonly used and machine-readable
                format. You also have the right to transmit your information to
                others and in exercising of this right; you shall have the right
                to such information transmitted directly from us to another
                where technically feasible. Please note that we will not be
                responsible for the security of such information once it is
                transmitted to another party.
              </p>
              <p style="margin-left:2.5em;"
                >Right to object and automated individual decision making</p
              >
              <p style="margin-left:5em;">
                You have the right to object at any time of the processing of
                your information.
              </p>
              <p style="margin-left:5em;">
                Where your information is processed for direct marketing
                purposes, you shall have the right to object at any time to
                process of your information for such marketing including
                profiling to the extent that it is related to such direct
                marketing.
              </p>
              <p style="margin-left:5em;"
                >Automated individual decision-making including profiling</p
              >
              <p style="margin-left:5em;">
                You shall have the right not to be under a decision based solely
                on automated processing including profiling which produces legal
                effects to you. However, this right shall not be applied if a
                decision is necessary for entering into or performance of
                contract between us, and/or the decision is based on your
                consent.
              </p>
              <p><b>Security of your information</b></p>
              <p>
                To preserve and protect the privacy of your personal
                information, the website or application has set out the internal
                control regulations to determine the right to access or use your
                personal information and to preserve and safeguard important
                information such as your credit card numbers. The website or
                application has put in place the system to protect your
                information such as the Secure Sockets Layer (SSL) protocol for
                managing the security of a message transmission on the Internet.
                <br />Terms of Use, Notices, and Revisions
              </p>
              <p>
                If you choose to use our Services, your use and any dispute over
                privacy is subject to this Notice and our Terms of Use,
                including limitations on damages, resolution of disputes, and
                application of the law of Thailand. If you have any concern
                about privacy at our website or application, please contact us
                with a thorough description at email@email.com / contact us, and
                we will try to resolve it.
              </p>
              <p><b>Adjustment your preferences</b></p>
              <p>
                If you would like to adjust, revoke or opt out your consent or
                if you have any questions, recommendations or any complaints
                about the privacy statement or its implementation, please do not
                hesitate to contact us. If you have any questions as to how we
                collect and use your personal information, please contact us at
                email@email.com / contact us.
              </p>
              <p>
                We are willing to answer and listen to the recommendations and
                complaints which will contribute to better services.
              </p>
              <p><u>Pop-up for cookie</u></p>
              <p>
                This website or application uses cookies to provide you with a
                personalized browsing experience. By using this website or
                application, you agree to our use of cookies as explained in our
                Privacy Notice. Please read our Privacy Notice for more
                information on how we use cookies and how you can manage them.
              </p>
              <p><u>Pop-up for marketing activities</u></p>
              <p style="margin-left: :2.5em;"
                >Consent Form to Process Personal Information</p
              >
              <p
                >Please mark ✓ in front of the topic you wish to give consent
                and allow “Muaythai Iyarin application”, “Us” to process your
                personal data for the following purposes.</p
              >

              <!-- <div class="row">
                    <div class="col-1">
                      <input
                        type="checkbox"
                        class="form-check-input ml-2"
                        v-model="checkbox"
                      />
                    </div>

                    <div class="col">
                      To analyze, research, develop our products or services,
                      and to allow us to offer products and services, including
                      newsletter distribution, event invitation, and our sales
                      promotion details
                    </div>
                  </div> -->
              <p></p>
            </div>
            <!-- <div class="d-flex justify-content-center ">
                  <button
                    v-show="checkbox"
                    class="btn btn-primary btn-block w-25 "
                    type="submit"
                    @click="
                      () => {
                        this.$router.push({
                          path: `/term`,
                        })
                      }
                    "
                    >Next</button
                  >
                </div> -->
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </div>
</template>

<style lang="scss" module></style>
