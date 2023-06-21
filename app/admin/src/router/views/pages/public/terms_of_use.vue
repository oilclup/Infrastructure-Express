<script>
import Layout from '@layouts/default'
import { authMethods } from '@state/helpers'
import appConfig from '@src/app.config'

export default {
  page: {
    title: 'Term Of Use',
    meta: [
      { name: 'description', content: `Term Of Use to ${appConfig.title}` },
    ],
  },
  components: { Layout },
  data() {
    return {
      email: '',
      error: null,
      tryingToReset: false,
      isResetError: false,
      isSuccess: false,
      successMessage: null,
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
  <div class="account-pages">
    <div class="row justify-content-center">
      <div class="col-md-12 col-xl-10">
        <div class="card">
          <div class="card-body">
            <h5>TERM OF USE</h5>
            <div class="row">
              <p><b>1. GENERAL INTRODUCTION</b></p>
              <p>
                Welcome to Muaythai Iyarin. Muaythai Iyarin offers a world-class
                martial arts training program in Seattle, WA with expert
                instruction in Muay Thai, kickboxing & self-defence. The
                Muaythai Iyarin co. Ltd.("Muaythai Iyarin" or “We” or “Our”)
                provides website features, application and other products and
                services to you when you visit or use at Muaythai Iyarin, use
                Muaythai Iyarin products or services, use Muaythai Iyarin
                applications for mobile, or use software provided by Muaythai
                Iyarin in connection with any of the foregoing (collectively,
                the “Services", “Our Services”). Muaythai Iyarin provides the
                Services subject to the following conditions.
              </p>
              <p>
                By accessing or using the Services of Muaythai Iyarin, you agree
                to these terms and conditions set forth in here, and you
                represent and warrant that you have the right, authority, and
                capacity to enter into these terms and conditions. For Minor
                under the applicable laws, including but not limited to their
                native country, the country of their access to or use our
                Services, parental or Legal Guardian’s consent and/or control is
                required at all time while using our Services. Please read the
                Terms of Use carefully. If you do not agree with all of the
                provisions of these terms and conditions, do not access and/or
                use and/or continue using our Services.
              </p>
              <p>
                We offer a wide range of Muaythai Services, and sometimes
                additional terms may apply. When you use an Service (for
                example, Your Profile, Video, applications,…….) you also will be
                subject to the guidelines, terms and agreements applicable to
                that Service ("Service Terms"). If these Terms of Use are
                inconsistent with the Service Terms, those Service Terms
                specified thereof will control.
              </p>
              <p
                ><br />We provide you with choices of our services and many
                more.</p
              >
              <p style="margin-left:2.5em;">
                Muaythai Iyarin members read FREE news from many Muaythai/Thai
                boxing clubs in Thailand and around the world. Our members can
                read as much as they want from over a hundred articles, tips,
                and more.
                <br />We also offer a variety of Muaythai/Thai boxing courses in
                application, is taught by top professional boxers/instructors
                from Thailand, so you can learn something new anytime, anywhere.
                Hundreds of free courses give you access to on-demand video for
                practices and exercises. We provide you with features you can
                interact with professional boxers/instructors. <br />We provide
                information of various Muaythai/Thai boxing clubs in Thailand
                from all parts of Thailand.
              </p>
              <br />
              <p
                ><b>2. PRIVACY NOTICE </b><br /><br />Please review our
                <u>Privacy Notice</u>, which also governs your use of Services,
                to understand our practices.</p
              >

              <p>
                <b> 3. ACCOUNT </b><br /><br />Account Creation. You may need
                your own account for our Services and you may be required to be
                logged in to the account and have a valid payment method
                associated with it. In order to use certain features of our
                Services, you must register for an account (“Account”) and
                provide certain information of yourself as required by the
                account registration form. You represent and warrant that: (a)
                all required information you submit through our Services is true
                and accurate; (b) you will maintain the accuracy of such
                information; (c) you are solely responsible for your own
                information. You acknowledge all risks associated with use of
                your information including reliance on its accuracy,
                completeness or usefulness by others or any disclosure by you of
                any of your information that identifies you or any third party
                under this Terms of Use. You may delete your Account at any
                time, for any reason, by following instructions on the Services.
                We may suspend or terminate your Account in accordance with
                Section 14 and 15. In addition, you may not represent or imply
                to others that your information is in any way provided,
                sponsored, endorsed by us. We are not obliged to backup any of
                your information, and your information may be deleted at any
                time without prior notice.
              </p>
              <p>
                License. You hereby grant (and you represent and warrant that
                you have the right to grant) to us an irrevocable, nonexclusive,
                royalty-free and fully-paid worldwide license to reproduce,
                distribute, display publicly and perform, prepare derivative
                works of, incorporate into other works, and otherwise use and
                exploit your information, and to grant sublicenses of the
                foregoing rights, solely for the purposes of an in connection
                with providing the Services. You hereby irrevocably waive (and
                agree to cause to be waived) any claims and assertions of moral
                rights or attribution with respect to your information.
              </p>
              <p>
                Account Confidentiality. You are responsible for maintaining the
                confidentiality of your account and password and for restricting
                access to your account and you are responsible for all
                activities that occur under your Account. You agree to notify us
                immediately of any unauthorized use, or suspected unauthorized
                use of your Account or any other breach of security. We will not
                be liable for any loss or damage arising from your failure to
                comply with the above requirements.
              </p>
              <p
                ><b><br />4. LICENSE AND ACCESS</b></p
              >
              <p>
                Subject to your compliance with these Terms of Use and any
                Service Terms, and your payment of any applicable fees, Muaythai
                Iyarin or its content providers grant you a limited,
                non-exclusive, non-transferable, non-sublicensable license to
                access and make personal and non-commercial use of our Services.
                This license does not include any resale or commercial use of
                any of our Service, or contents; any collection and use of any
                product listings, descriptions, or prices; any derivative use of
                any of our Service or contents; any downloading, copying, or
                other use of account information for the benefit of any third
                party; or any use of data mining, robots, or similar data
                gathering and extraction tools. All rights not expressly granted
                to you in these Terms of Use or any Service Terms are reserved
                and retained by Muaythai Iyarin or its licensors, suppliers,
                publishers, rightsholders, or other content providers. None of
                our Service, nor any part of our Service, may be reproduced,
                duplicated, copied, sold, resold, visited, or otherwise
                exploited for any commercial purpose without our express written
                consent. You may not misuse our Services. You may use our
                Services only as permitted by law. The licenses granted by us
                are deemed terminated if you do not comply with any of these
                Terms of Use or any Service Terms.
              </p>
              <p>
                We reserve the right, at any time, to modify, suspend, or
                discontinue the Services (in whole or in part) without notice to
                you. You may check the update through our Services provided
                herein. You agree that we will not be liable for any
                modification, suspension, or discontinuation of the Services or
                any part thereof.
              </p>
              <p
                ><b><br />5. ELECTRONIC COMMUNICATIONS</b></p
              >
              <p>
                When you use our Services, or send e-mails, text messages, and
                other communications from your desktop or mobile device to us,
                you may be communicating with us electronically. You consent to
                receive communications from us electronically, such as e-mails,
                texts, mobile push notices, or notices and messages on this site
                or through the other our Services, such as our Message Center,
                and you can retain copies of these communications for your
                records. You agree that all agreements, notices, disclosures,
                and other communications that we provide to you electronically
                satisfy any legal requirement that such communications be in
                writing.
              </p>
              <p
                ><b><br />6. INTELLECTUAL PROPERTY RIGHTS</b></p
              >
              <p>
                All content included in or made available through any our
                Service, such as text, graphics, logos, button icons, images,
                videos, audio clips, scripts, digital downloads, data
                compilations, and software is the property of Muaythai Iyarin or
                its content suppliers and protected by laws of Thailand and
                other applicable laws. The compilation of all content included
                in or made available through any of our Service is the exclusive
                property of Muaythai Iyarin and protected by laws of Thailand
                and other applicable laws.
              </p>
              <p
                ><b><br />7. RISK OF LOSS</b></p
              >
              <p>
                All purchases of product from us are made pursuant to a shipment
                contract. This means that the risk of loss and title for such
                product pass to you upon our delivery to the carrier.
              </p>
              <p
                ><b><br />8. REFUNDS</b></p
              >
              <p>
                Refund Policy: All product or services rendered by us are
                provided on a non-refundable basis. This includes, but it not
                limited to, subscription fees, regardless of usage. In addition,
                you agree and accept that if your account is canceled by us for
                violation of this Terms of Use, all payments made to us become
                completely non-refundable. You agree to waive your right to any
                refund.
              </p>
              <p><b>9. INDEMNIFICATION</b></p>
              <p>
                You agree to indemnify and hold us (and our officers, employees,
                and agents) harmless, including costs and attorneys’ fees, from
                any claim or demand made by any third-party due to or arising
                out of (a) your use of our Services, (b) your violation of these
                Terms of use, (c) your violation of applicable laws or
                regulations or (d) your information. We reserve the right, at
                your expense, to assume the exclusive defense and control of any
                matter for which you are required to indemnify us, and you agree
                to cooperate with our defense of these claims. You agree not to
                settle any matter without our prior written consent. We will use
                reasonable efforts to notify you of any such claim, action or
                proceeding upon becoming aware of it.
              </p>
              <p
                ><b><br />10. OTHER BUSINESSES</b></p
              >
              <p>
                Parties other than us operate stores, provide services or
                software, or sell product lines through our Services. In
                addition, we provide links to the sites of affiliated companies
                and certain other businesses. If you purchase any of the
                products or services offered by these businesses or individuals,
                you are purchasing directly from those third parties, not from
                us. We are not responsible for examining or evaluating, and we
                do not warrant, the offerings of any of these businesses or
                individuals (including the content provided by them). Those
                businesses or individuals are operate on themselves. We do not
                assume any responsibility or liability for the actions, product,
                and content of all these and any other third parties. You should
                carefully review their privacy statements and other conditions
                of use.
              </p>
              <p
                ><b><br />11. THIRD-PARTY LINKS & ADS</b></p
              >
              <p>
                Our Services may contain links to third-party websites and
                services, and/or display advertisements for third parties
                (collectively, “Third-Party Links & Ads”). Such Third-Party
                Links & Ads are not under our control, and we are not
                responsible for any Third-Party Links & Ads. We provides access
                to these Third-Party Links & Ads only as a convenience to you,
                and do not review, approve, monitor, endorse, warrant, or make
                any representations with respect to Third-Party Links & Ads. You
                use all Third-Party Links & Ads at your own risk, and should
                apply a suitable level of caution and discretion in doing so.
                When you click on any of the Third-Party Links & Ads, the
                applicable third-party’s terms and policies apply, including the
                third-party’s privacy and data gathering practices. You should
                make whatever investigation you feel necessary or appropriate
                before proceeding with any transaction in connection with such
                Third-Party Links & Ads.
              </p>
              <p
                ><b><br />12. SANCTIONS AND EXPORT POLICY</b></p
              >
              <p>
                You may not use any of our Service if you are the subject of
                U.S. sanctions or of sanctions consistent with U.S. law imposed
                by the governments of the country where you are using our
                Services. You must comply with all U.S. or other export and
                re-export restrictions that may apply to goods, software
                (including our Software), technology, and services.
              </p>
              <p
                ><b><br />13. APPLICABLE LAW</b></p
              >
              <p>
                By using any of our Service, you agree that the laws of Thailand
                without regard to principles of conflict of laws, will govern
                this Terms of Use and any dispute arising between you and
                Muaythai Iyarin.
              </p>
              <p><b>14. SITE POLICIES, MODIFICATION, AND SEVERABILITY</b></p>
              <p>
                Please review our other policies, such as our pricing policy,
                posted on our website or application and any of our Services.
                These policies also govern your use of our Services. We reserve
                the right to make changes to our Services, sites, applications,
                policies, Service Terms, and these Terms of Use at any time. If
                any of these conditions shall be deemed invalid, void, or for
                any reason unenforceable, that condition shall be deemed
                severable and shall not affect the validity and enforceability
                of any remaining condition.
              </p>
              <p>
                We reserve the right (but have no obligation) to review any
                information, and to investigate and/or take appropriate action
                against you in our sole discretion if you violate the any
                provision of the Terms of Use, Service Terms or other conditions
                create liability for us or any other person. Such action may
                include removing or modifying your information, terminating your
                Account in accordance with Section 8, and/or reporting you to
                law enforcement authorities.
              </p>
              <p
                ><b><br />15. TERM AND TERMINATION</b></p
              >
              <p>
                Subject to this Section, these Terms will remain in full force
                and effect while you use the Services. We may suspend or
                terminate your rights to use the Services (including your
                Account) at any time for any reason at our sole discretion,
                including for any use of our Services in violation of these
                Terms. Upon termination of your rights under these Terms, your
                Account and right to access and use our Services will terminate
                immediately. You understand that any termination of your Account
                may involve deletion of your information associated with your
                Account from our live databases. We will not have any liability
                whatsoever to you for any termination of your rights under these
                Terms, including for termination of your Account or deletion of
                your information.
              </p>
              <p><b>16. DISCLAIMER</b></p>
              <p>
                OUR SERVICES AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS
                (INCLUDING SOFTWARE) AND OTHER SERVICES INCLUDED ON OR OTHERWISE
                MADE AVAILABLE TO YOU THROUGH OUR SERVICES ARE PROVIDED ON AN
                "AS IS" AND "AS AVAILABLE" BASIS, UNLESS OTHERWISE SPECIFIED IN
                WRITING. WE MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND,
                EXPRESS OR IMPLIED, AS TO THE OPERATION OF OUR SERVICES, OR THE
                INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE)
                OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU
                THROUGH OUR SERVICES, UNLESS OTHERWISE SPECIFIED IN WRITING. YOU
                EXPRESSLY AGREE THAT YOUR USE OF OUR SERVICES IS AT YOUR SOLE
                RISK.
              </p>
              <p>
                WE DO NOT WARRANT THAT OUR SERVICES, INFORMATION, CONTENT,
                MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES
                INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH OUR
                SERVICES, OR ELECTRONIC COMMUNICATIONS SENT FROM US ARE FREE OF
                VIRUSES OR OTHER HARMFUL COMPONENTS. TO THE FULL EXTENT
                PERMISSIBLE BY LAW, WE WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY
                KIND ARISING FROM THE USE OF ANY OF OUR SERVICE, OR FROM ANY
                INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE)
                OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU
                THROUGH ANY OF OUR SERVICE, INCLUDING, BUT NOT LIMITED TO
                DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL
                DAMAGES, UNLESS OTHERWISE SPECIFIED IN WRITING.
              </p>
              <p><b>17. LIMITATION OF LIABILITY</b></p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE BE
                LIABLE TO YOU OR ANY THIRD-PARTY FOR ANY LOST PROFITS, LOST
                DATA, COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY
                INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR
                PUNITIVE DAMAGES ARISING FROM OR RELATING TO THESE TERMS OF USE
                OR YOUR USE OF, OR INABILITY TO USE, OUR SERVICES, EVEN IF WE
                HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO,
                AND USE OF, OUR SERVICES IS AT YOUR OWN DISCRETION AND RISK, AND
                YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE OR
                COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.
              </p>
              <p>
                SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF
                LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE
                LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
              </p>
              <p>
                SOME OF OUR FEATURES MAY PROMOTE PHYSICAL ACTIVITY, YOU
                ACKNOWLEDGE AND AGREE TO CONSIDER THE RISKS INVOLVED AND CONSULT
                WITH YOUR MEDICAL PROFESSIONAL BEFORE ENGAGING IN ANY PHYSICAL
                ACTIVITY. WE WILL NOT RESPONSIBLE OR LIABLE FOR ANY INJURIES OR
                DAMAGES YOU MAY SUSTAIN THAT RESULT FROM YOUR USE OF, OR
                INABILITY TO USE, ANY OF OUR SERVICES OR FEATURES.
              </p>
              <p
                ><b><br />18. GOVERNING LAW AND ARBITRATION</b></p
              >
              <p>
                The governing law shall be the laws of Thailand. Any dispute
                arising out of this Terms of Use shall be settled by arbitration
                administered by the Thailand Arbitration Centre, in accordance
                with the Arbitration Rules of the Thailand Arbitration Centre in
                force at the time, and which rules are deemed to be incorporated
                by reference in this Clause. The tribunal shall consist of three
                arbitrators. Each Party shall appoint one arbitrator, and the
                two arbitrators will appoint a third arbitrator. The language of
                the arbitration shall be English. The arbitration award shall be
                final and binding between the Parties.
              </p>
              <p><b>19. CONTACT OUR ADDRESS</b></p>
              <p
                >Please insert full address, email, department, contact
                department (if any)</p
              >
            </div>
            <!-- 
                <div class="d-flex justify-content-center ">
                  <button
                    class="btn btn-primary btn-block w-25 "
                    type="submit"
                    @click="
                      () => {
                        this.$router.push({
                          path: `/App-forget-password`,
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
  <!-- end container -->
</template>

<style lang="scss" module></style>
