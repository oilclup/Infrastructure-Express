<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { required } from 'vuelidate/lib/validators'
import { BASE_IMAGE_URL } from '@src/config/configs'

import axios from '@/axios'

/**
 * Chat list - Renders a chat list with a form to enter new message
 */
export default {
  components: { VuePerfectScrollbar },
  props: {
    title: {
      type: String,
      default: 'Chat',
    },
    chatWindowHeight: {
      type: String,
      default: '230',
    },
    chat: {
      type: Object,
    },
    messages: {
      type: Array,
      default: function() {
        return []
      },
    },
  },
  data() {
    return {
      baseImageUrl: BASE_IMAGE_URL,
      chats: {
        message: '',
      },
      data: {},
      submitform: false,
    }
  },
  mounted() {
    this.getTargetChat()
  },
  validations: {
    chats: {
      message: { required },
    },
  },
  methods: {
    /**
     * Chat form submit
     */
    async getTargetChat() {
      const result = await axios.post(`/api/chat/getTargetChat`, {
        receiver_id: this.chat.receiver_id._id,
        sender_id: this.chat.sender_id._id,
      })

      this.data = result.data

      //   this.dataVideo = result.data.data
    },
    async saveMessage() {
      this.submitform = true

      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      } else {
        // var id = this.messages.length
        const message = this.chats.message
        // const currentDate = new Date()
        // // Message Push in Chat
        // this.data.messages.push({
        //   image: require('@assets/images/users/avatar-7.jpg'),
        //   id: id + 1,
        //   name: '5f056ab2d7e37e971ea27f53',
        //   message: message,
        //   time: currentDate.getHours() + ':' + currentDate.getMinutes(),
        // })

        await axios
          .post(`/api/chat/onChat`, {
            receiver_id: this.chat.receiver_id._id,
            sender_id: this.chat.sender_id._id,
            message: message,
          })
          .then((result) => {
            this.getTargetChat()
          })
          .catch((err) => {
            alert('error')
          })
      }
      this.submitform = false
      this.chats = {}
    },
  },
}
</script>

<template>
  <div class="card">
    <div class="card-body pt-2">
      <!-- <b-dropdown
				class="mt-2 float-right"
				variant="black"
				right
				toggle-class="p-0 arrow-none text-muted"
			>
				<template v-slot:button-content>
					<i class="uil uil-ellipsis-v"></i>
				</template> -->

      <!-- item-->
      <!-- <b-dropdown-item href="javascript:void(0);"> -->
      <!-- <i class="uil uil-refresh mr-2"></i>Refresh -->
      <!-- </b-dropdown-item> -->
      <!-- item-->
      <!-- <b-dropdown-item href="javascript:void(0);"> -->
      <!-- <i class="uil uil-user-plus mr-2"></i>Add Member
				</b-dropdown-item>
				<b-dropdown-divider></b-dropdown-divider> -->
      <!-- item-->
      <!-- <b-dropdown-item href="javascript:void(0);" variant="danger">
					<i class="uil uil-exit mr-2"></i>Edit
				</b-dropdown-item> -->
      <!-- </b-dropdown> -->
      <h5 class="mb-4 header-title">{{ title }}</h5>

      <VuePerfectScrollbar :style="`max-height:${chatWindowHeight}`">
        <div class="chat-conversation">
          <ul class="conversation-list slimscroll">
            <li
              v-for="(chat, index) in data.messages"
              :key="chat.id"
              :class="
                chat.sender_id == data.sender_id ? null : { odd: index + 1 }
              "
              class="clearfix"
            >
              <div class="chat-avatar">
                <img
                  v-if="chat.sender_id !== data.sender_id"
                  :src="`${baseImageUrl}/${data.fighter.fighter_image}`"
                />
                <img
                  v-else-if="data.customer.avatarUrl"
                  :src="
                    data.customer.avatarUrl.includes('http')
                      ? `${data.customer.avatarUrl}`
                      : `${baseImageUrl}/${data.customer.avatarUrl}`
                  "
                />
                <i>{{
                  chat.createdAt ? chat.createdAt.substring(0, 19) : chat.time
                }}</i>
              </div>

              <div class="conversation-text">
                <div class="ctext-wrap">
                  <i>{{
                    chat.sender_id == data.sender_id
                      ? data.customer.firstName + ' ' + data.customer.lastName
                      : data.fighter.fighter_name
                  }}</i>
                  <p>{{ chat.message }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </VuePerfectScrollbar>
      <form @submit.prevent="saveMessage">
        <div class="row mt-3">
          <div class="col-lg-9">
            <input
              id="message"
              v-model="chats.message"
              type="text"
              class="form-control"
              placeholder="Enter your text"
              name="message"
              :class="{ 'is-invalid': submitform && $v.chats.message.$error }"
            />
            <div
              v-if="submitform && !$v.chats.message.required"
              class="invalid-feedback"
              >This value is required.</div
            >
          </div>

          <div class="col-lg-3">
            <button type="submit" class="btn btn-danger chat-send btn-block"
              >Send</button
            >
          </div>
        </div>
        <!-- end row -->
      </form>
      <!-- end form -->
    </div>
  </div>
</template>
