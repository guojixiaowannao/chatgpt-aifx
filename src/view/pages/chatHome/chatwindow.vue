<template>
  <div class="chat-window">
    <div class="top" v-if="is_top">
      <el-row style="height: 60px;">

        <el-col :span="personInfoSpan[0]">
          <div class="head-pic">
            <HeadPortrait :imgUrl="frinedInfo.headImg"></HeadPortrait>
          </div>
        </el-col>

        <el-col :span="personInfoSpan[1]">
          <div class="info-detail">
            <div class="name">{{ frinedInfo.name }}</div>
            <div class="detail">{{ frinedInfo.detail }}</div>
          </div>
        </el-col>
      </el-row>

    </div>
    <div v-show="!acqStatus">
      <div class="line"></div>
    </div>
    <div class="botoom" :style="botoomStyle">
      <div class="chat-content" id="chat-content" ref="chatContent" :style="{ height: contentheight }">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.role == 'assistant'">
            <div class="info-time">
              <img :src="frinedInfo.headImg" alt="" />
              <span>{{ frinedInfo.name }}</span>
              <span v-show="item.time">{{ item.time }}</span>
            </div>
            <div class="chat-img" v-if="item.chatType && item.chatType == 1">
              <img :src="item.content" alt="表情" v-if="item.extend.imgType == 1" style="width: 100px; height: 100px" />
              <el-image style="border-radius: 10px" :src="item.content" :preview-src-list="srcImgList" v-else>
              </el-image>
            </div>
            <div class="chat-text" v-else>
              <el-row :gutter="20">
                <el-col :span="2">
                  <svg t="1679666016648" @click="$copy(item.content, '已复制')" class="icon" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6241" width="22" height="22">
                    <path
                      d="M661.333333 234.666667A64 64 0 0 1 725.333333 298.666667v597.333333a64 64 0 0 1-64 64h-469.333333A64 64 0 0 1 128 896V298.666667a64 64 0 0 1 64-64z m-21.333333 85.333333H213.333333v554.666667h426.666667v-554.666667z m191.829333-256a64 64 0 0 1 63.744 57.856l0.256 6.144v575.701333a42.666667 42.666667 0 0 1-85.034666 4.992l-0.298667-4.992V149.333333H384a42.666667 42.666667 0 0 1-42.368-37.674666L341.333333 106.666667a42.666667 42.666667 0 0 1 37.674667-42.368L384 64h447.829333z"
                      fill="#909399" p-id="6242"></path>
                  </svg>
                </el-col>
                <el-col :span="21">
                </el-col>
              </el-row>
              <markdown-it-vue :content="item.content.trim()" />
            </div>
          </div>
          <div class="chat-me" v-else-if="item.role == 'user'">
            <div class="info-time">
              <span>{{ user.username }}</span>
              <span v-show="item.time">{{ item.time }}</span>
              <img src="" alt="" />
            </div>

            <div class="chat-img" v-if="item.chatType && item.chatType == 1">
              <img :src="item.content" alt="表情" v-if="item.extend.imgType == 1" style="width: 100px; height: 100px" />
              <el-image style="max-width: 300px; border-radius: 10px" :src="item.content" :preview-src-list="srcImgList"
                v-else>
              </el-image>
            </div>
            <div class="chat-text" v-else>
              <span style="font-size:16px">{{ item.content }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <!--表情-->
        <div class="emoji boxinput" @click="clickEmoji" v-show="buttonStatus">
          <img src="@/assets/img/emoji/smiling-face.png" alt="" />
        </div>
        <!--录音-->

        <!--emo表情列表-->
        <div class="emoji-content" v-show="buttonStatus">
          <Emoji v-show="showEmoji" @sendEmoji="sendEmoji" @closeEmoji="clickEmoji"></Emoji>
        </div>
        <!--输入框-->
        <el-input type="textarea" id="textareaMsg" ref="textInput" :autosize="{}" class="textarea" v-model="inputMsg"
          maxlength="2000"
          style="margin-left: 2%;margin-top: 3px;min-height: 51px;max-height:400px;max-width: 80%;min-width: 45%;  height: auto;"
          @keydown.enter.stop @keydown.enter.shift.prevent="insertLineBreak" placeholder="在此输入您的提示词~"></el-input>
        <!--发送-->
        <div>
          <div class="send boxinput" @click="sendText" v-if="acqStatus">
            <img src="@/assets/img/emoji/rocket.png" alt="" />
          </div>
          <div class="spinner" v-else>
            <svg viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { animation, getNowTime, JCMFormatDate } from "@/util/util";
import HeadPortrait from "@/components/HeadPortrait";
import Emoji from "@/components/Emoji";
import FileCard from "@/components/FileCard.vue";
import { getchatrecords, setMessage, dellist } from "@/api/admin";
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import { AI_HEAD_IMG_URL, USER_HEAD_IMG_URL, USER_NAME } from '@/store/mutation-types'
import { getToken } from '@/util/auth';

export default {
  components: {
    HeadPortrait,//头部图片组件
    Emoji,//表情
    FileCard,
    MarkdownItVue
  },
  props: {
    storeStatu: Number,
    settingInfo: Object,//选择的第几个栏目
    frinedInfo: Object,//chatgpt信息
    user: Object,//用户信息
    default() {
      return {};
    },
  },
  watch: {
    frinedInfo() {
      // console.log(this.frinedInfo, 'frinedInfo');
      // console.log(this.user, 'user');
      if (getToken('token')) {
        this.getFriendChatMsg();//当切换模型时,重新加载聊天记录
      }
    },
  },
  data() {
    return {
      fileArrays: [],
      inputsStatus: true,
      //是否显示表情和录音按钮
      buttonStatus: true,
      //是否在接收消息中，如果是则true待发送状态，如果是false则是等待消息转圈状态
      acqStatus: true,
      chatList: [],
      inputMsg: "",
      showEmoji: false,
      srcImgList: [],
      updateImage: null,
      // 是否隐藏对话框上方介绍（空间局促时隐藏）
      personInfoSpan: [2, 17, 5],
      //初始化消息,不会判断对话为空
      is_initialize: false,
      //头部开关
      is_top: true,
      botoomheight: '85vh',
      contentheight: '85%',
    };
  },


  created() {
    window.addEventListener('resize', this.handleResize)//窗口大小变化触发
    this.handleResize()
  },

  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    botoomStyle: function () {
      // 动态计算并返回样式对象
      return {
        height: this.botoomheight,
        background: 'rgb(50, 54, 68)',
      };
    }
  },
  methods: {
    //清空会话
    async deletelist() {
      this.chatList = [];
      let params = {
        role_id: this.frinedInfo.id
      };
      let data = await dellist(params);
      if (data.code === 200) {
        this.$message({
          message: data.msg,
          type: 'success'
        });
      } else {
        this.$message({
          message: "清空失败~",
          type: "warning",
        });
      }

    },
    //加载聊天记录
    async getFriendChatMsg() {
      let params = {
        role_id: this.frinedInfo.id
      };
      let data = await getchatrecords(params);
      if (data.code === 200) {
        this.chatList = data.data;
        var arr = Object.keys(this.chatList);
        //判断历史记录为空,并且有角色进行初始化对话
        if (arr.length === 0 && this.frinedInfo.id != '1') {
          this.is_initialize = true;
          this.sendText();
          this.is_initialize = false;
        }
        this.$nextTick(() => {
          this.scrollBottom();//滑致聊天记录最底层
        });

      }
    },
    //监听窗口的变化
    handleResize() {
      if (window.innerWidth <= 700) {
        this.buttonStatus = false
        // var textareaMsg = document.getElementById("textareaMsg");
        // textareaMsg.style.marginLeft = "0px";
        this.is_top = false;
        this.botoomheight = '93vh';
        this.personInfoSpan = [14, 0, 10];
        this.contentheight = '91%';

      } else {
        this.buttonStatus = true
        this.personInfoSpan = [2, 17, 5];
      };
    },

    //发送消息加入数组
    sendMsg(msgList) {
      this.chatList.push(msgList);
      this.scrollBottom();
    },

    //发送文字信息
    sendText() {
      if (!this.$parent.isLogin()) {
        return false;
      }
      // console.log(this.frinedInfo, 'frinedInfo');
      //显示等待条
      this.$nextTick(() => {
        this.acqStatus = false
      })
      //获取当前时间
      const dateNow = JCMFormatDate(getNowTime());
      //如果有输入消息
      if (this.inputMsg || this.is_initialize) {
        let chatMsg = {
          // time: dateNow,
          content: this.inputMsg,
          // chatType: 0, //信息类型，0文字，1图片
          role: "user", //uid
        };
        // console.log(chatMsg, 'chatMsg');
        //将消息加入消息数组
        if (this.inputMsg) {
          this.sendMsg(chatMsg);
        }
        let chatBeforResMsg = {
          // time: JCMFormatDate(getNowTime()),
          content: "正在思考中.....",
          // chatType: 0, //信息类型，0文字，1图片
          role: 'assistant', //uid
        };
        this.chatCompletion(chatBeforResMsg)
        // if (this.storeStatu == 0) {
        //   this.$emit('personCardSort', this.frinedInfo.id)

        // } else if (this.storeStatu == 1) {
        //   this.$emit('fineTunesCardSort', this.frinedInfo.id)
        // }
        this.inputMsg = "";
        // this.$parent.updateMoneyInfo();
      } else {
        this.$nextTick(() => {
          this.acqStatus = true
        });
        this.$message({
          message: "消息不能为空哦~",
          type: "warning",
        });
      }
    },
    //发送消息给chatgpt
    async chatCompletion(chatBeforResMsg, message) {
      //新增一个空的消息
      this.sendMsg(chatBeforResMsg);
      //获取上一个消息的数组键对值
      const currentResLocation = this.chatList.length - 1
      let _this = this
      let params = {
        'message': this.inputMsg,
        'role_id': this.frinedInfo.id
      }
      let data = await setMessage(params);
      if (data.code === 200) {
        this.$emit('update-parent-value', 2);
        //将返回消息加入消息数组
        _this.chatList[currentResLocation].content = data.message + ":grinning:"
        this.$nextTick(() => {
          this.acqStatus = true
        });
      } else {
        this.$message({
          message: data.messages,
          type: "warning",
        });
        this.acqStatus = true;
        //将返回消息加入消息数组
        _this.chatList[currentResLocation].content = "积分不足!请使用卡密激活充值!" + ":grinning:"
      }
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    //关闭标签框
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
    },

    //发送表情
    sendEmoji(msg) {
      const dateNow = JCMFormatDate(getNowTime());
      let chatMsg = {
        headImg: USER_HEAD_IMG_URL,
        name: USER_NAME,
        time: dateNow,
        content: msg,
        chatType: 1, //信息类型，0文字，1图片
        extend: {
          imgType: 1, //(1表情，2本地图片)
        },
        role: "user",
      };
      this.sendMsg(chatMsg);
      this.clickEmoji();
    },
    //发送本地图片
    // sendImg(e) {
    //   this.acqStatus = false
    //   //获取文件
    //   const file = e.target.files[0];

    //   // 验证文件类型是否为PNG格式
    //   if (file.type !== "image/png") {
    //     this.$message({
    //       message: "请上传一个有效的PNG文件~",
    //       type: "warning",
    //     });
    //     this.$nextTick(() => {
    //       this.acqStatus = true
    //     });
    //     return;
    //   }

    //   // 验证文件大小是否小于4MB
    //   if (file.size > 4 * 1024 * 1024) {
    //     this.$message({
    //       message: "请上传一个小于4MB的文件~",
    //       type: "warning",
    //     });
    //     this.$nextTick(() => {
    //       this.acqStatus = true
    //     });
    //     return;
    //   }

    //   if (this.settingInfo.openChangePicture) {
    //     this.updateImage = file
    //     this.$message({
    //       message: "图片上传完成啦，请给我提示进行编辑~",
    //       type: "info",
    //     });
    //     e.target.files = null;
    //     this.$nextTick(() => {
    //       this.acqStatus = true
    //     });
    //     return
    //   }
    //   // 通过验证后，上传文件
    //   const formData = new FormData();
    //   formData.append("image", file);
    //   formData.append("n", this.settingInfo.n);
    //   formData.append("size", this.settingInfo.size);

    //   const dateNow = JCMFormatDate(getNowTime());
    //   let _this = this;

    //   let chatMsg = {
    //     headImg: USER_HEAD_IMG_URL,
    //     name: USER_NAME,
    //     time: dateNow,
    //     msg: "",
    //     chatType: 1, //信息类型，0文字，1图片, 2文件
    //     extend: {
    //       imgType: 2, //(1表情，2本地图片)
    //     },
    //     uid: "jcm",
    //   };

    //   if (!e || !window.FileReader) return; // 看是否支持FileReader
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file); // 关键一步，在这里转换的
    //   reader.onloadend = function () {
    //     chatMsg.msg = this.result; //赋值
    //     _this.srcImgList.push(chatMsg.msg);
    //   };
    //   this.sendMsg(chatMsg);

    //   createImageVariations(formData, this.settingInfo.KeyMsg).then(data => {
    //     for (var imgInfo of data) {
    //       let imgResMsg = {
    //         headImg: AI_HEAD_IMG_URL,
    //         name: this.frinedInfo.name,
    //         time: JCMFormatDate(getNowTime()),
    //         msg: imgInfo.url,
    //         chatType: 1, //信息类型，0文字，1图片
    //         extend: {
    //           imgType: 2, //(1表情，2本地图片)
    //         },
    //         uid: this.frinedInfo.id, //uid
    //       };
    //       this.sendMsg(imgResMsg);
    //       this.srcImgList.push(imgInfo.url);
    //     }
    //     this.acqStatus = true
    //   })
    //   e.target.files = null;
    // },


  },
};
</script>


<style lang="scss" scoped>
.spinner {
  position: relative;
  width: 50px;
  height: 50px;
}

.spinner svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.spinner circle {
  stroke: #d5dcf9;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    stroke-dashoffset: 0;
    transform: rotate(0);
  }

  50% {
    stroke-dashoffset: -120px;
    transform: rotate(180deg);
  }

  100% {
    stroke-dashoffset: -240px;
    transform: rotate(360deg);
  }
}

::v-deep .el-main {
  padding: 0px;
}

::v-deep {
  .el-textarea__inner {
    background-color: rgb(66, 70, 86);
    border-radius: 15px;
    border: 2px solid rgb(34, 135, 225);
    /* padding: 10px; */
    box-sizing: border-box;
    transition: 0.2s;
    font-size: 20px;
    color: #fff;
    font-weight: 100;
    /* margin: 0 20px; */
    width: 98%;
    height: 100%;

  }
}

pre {
  background-color: #211f1f !important;
  border-radius: 20px !important;
  box-shadow: 0px 0px 9px 0px #000000 !important;
  color: #ffff !important;
}

.hljs {
  background-color: #211f1f !important;
  border-radius: 20px !important;
  box-shadow: 0px 0px 9px 0px #000000 !important;
  color: #ffff !important;
}

textarea::-webkit-scrollbar {
  width: 3px;
  /* 设置滚动条宽度 */
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgb(66, 70, 86);
  /* 设置滚动条滑块的背景色 */
  border-radius: 50%;
  /* 设置滑块的圆角 */
}

.spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 6px;
  position: relative;
  margin-top: 35px;

  .top {
    &::after {
      content: "";
      display: block;
      clear: both;
    }

    .head-pic {
      float: left;
    }

    .info-detail {
      float: left;
      margin: 5px 20px 0;

      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }

      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }

    .other-fun {
      float: right;
      margin-top: 20px;

      span {
        margin-left: 30px;
        cursor: pointer;
      }

      // .icon-tupian {

      // }
      input {
        display: none;
      }
    }
  }


  .textarea {
    &:focus {
      outline: none;
    }
  }

  .botoom {
    width: 100%;
    height: 85vh;
    background-size: 100% 100%;
    // background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 0px;
    box-sizing: border-box;
    position: relative;

    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 10px;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 3px;
        /* 设置滚动条宽度 */
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgb(66, 70, 86);
        /* 设置滚动条滑块的背景色 */
        border-radius: 50%;
        /* 设置滑块的圆角 */
      }

      .chat-friend {
        width: 100%;
        float: left;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        .chat-text {
          margin-left: 2%;
          float: left;
          max-width: 90%;
          padding: 15px;
          border-radius: 0px 20px 20px 20px;
          background-color: #fff;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
        }

        .info-time {
          margin: 10px 0;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: flex-start;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
          }

          span {
            line-height: 30px;
          }

          span:last-child {
            color: rgb(101, 104, 115);
            margin-left: 10px;
            vertical-align: middle;
          }
        }
      }

      .chat-me {
        width: 100%;
        float: right;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        .chat-text {
          float: right;
          max-width: 90%;
          padding: 15px;
          border-radius: 20px 0px 20px 20px;
          background-color: #95ec69;
          color: #000;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
        }

        .info-time {
          margin: 10px 0;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: flex-end;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 10px;
          }

          span {
            line-height: 30px;
          }

          span:first-child {
            color: rgb(101, 104, 115);
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }
    }

    .chatInputs {
      width: 100%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;

      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(50, 54, 68);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        box-shadow: 0px 0px 5px 0px rgb(0, 136, 255);
        position: relative;
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .emoji {
        transition: 0.3s;
        width: 50px;
        min-width: 50px;
      }

      .luyin {
        color: #fff;
        margin-left: 1.5%;
        font-size: 30px;
        text-align: center;
        transition: 0.3s;
        width: 50px;
        min-width: 50px;
      }

      .inputs {
        width: 95%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;

        &:focus {
          outline: none;
        }
      }

      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);

        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }
    }
  }
}


.line {
  position: relative;
  width: 94%;
  margin-left: 2%;
  height: 2px;
  background: linear-gradient(to right, red, yellow, green);
  animation: shrink-and-expand 2s ease-in-out infinite;

}

.line::before,
.line::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: inherit;
}

.line::before {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  left: 0;
  transform-origin: left;
  animation: shrink-left 2s ease-in-out infinite;
}

.line::after {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  right: 0;
  transform-origin: right;
  animation: shrink-right 2s ease-in-out infinite;
}

@keyframes shrink-and-expand {

  0%,
  100% {
    transform: scaleX(1);
  }

  50% {
    transform: scaleX(0);
  }
}

@keyframes shrink-left {

  0%,
  50% {
    transform: scaleX(1);
  }

  50.1%,
  100% {
    transform: scaleX(0);
  }
}

@keyframes shrink-right {

  0%,
  50% {
    transform: scaleX(1);
  }

  50.1%,
  100% {
    transform: scaleX(0);
  }
}
</style>
