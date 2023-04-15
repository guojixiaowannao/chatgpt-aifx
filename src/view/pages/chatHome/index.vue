<template>
  <div class="chatHome">
    <div class="chatLeft" :style="{ width: chatLeftwidth }" v-show="showPersonList">
      <div class="title" style="text-align: center;margin-top: 0px;">
        <svg t="1679634305168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3634" width="40" height="40">
          <path
            d="M512 960.4c-23.2 0-46.5-6-67.2-17.9L173.5 785.8c-41.4-23.9-67.2-68.5-67.2-116.3V356.1c0-47.8 25.7-92.4 67.2-116.3L444.8 83.1c41.4-23.9 92.9-23.9 134.3 0l271.4 156.7c41.4 23.9 67.2 68.5 67.2 116.3v313.4c0 47.8-25.7 92.4-67.2 116.3L579.2 942.5c-20.7 11.9-44 17.9-67.2 17.9z m0-805.6c-7.7 0-15.4 2-22.3 6L218.3 317.5c-13.8 7.9-22.3 22.7-22.3 38.6v313.4c0 15.9 8.5 30.7 22.3 38.6l271.4 156.7c13.8 7.9 30.8 7.9 44.6 0l271.4-156.7c13.8-7.9 22.3-22.7 22.3-38.6V356.1c0-15.9-8.5-30.7-22.3-38.6L534.3 160.8c-6.9-4-14.6-6-22.3-6z"
            fill="#ffffff" p-id="3635"></path>
          <path
            d="M514 559c-7.8 0-15.5-2-22.4-6L270.9 425.4c-21.5-12.4-28.8-39.8-16.4-61.3 12.4-21.5 39.8-28.8 61.3-16.4l198.1 114.5 189.7-110.9c21.4-12.5 48.9-5.3 61.4 16.1 12.5 21.4 5.3 48.9-16.1 61.4l-212.2 124c-7 4.1-14.9 6.2-22.7 6.2z"
            fill="#ffffff" p-id="3636"></path>
          <path
            d="M512 805.8c-24.8 0-44.9-20.1-44.9-44.9V514.1c0-24.8 20.1-44.9 44.9-44.9s44.9 20.1 44.9 44.9V761c0 24.7-20.1 44.8-44.9 44.8z"
            fill="#ffffff" p-id="3637"></path>
        </svg>
        <h2>Ai sharing</h2>
      </div>
      <div class="online-person" style="margin-top: 5%;">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="sessionClick" :class="{ whiteText: cutSetting === 1 }">会话</span>

            </div>
          </el-col>
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="modelClick" :class="{ whiteText: cutSetting === 0 }">功能</span>

            </div>
          </el-col>
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="fineTuningClick" :class="{ whiteText: cutSetting === 2 }">开发中</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span v-if="is_login" class="" @click="fileClick" :class="{ whiteText: cutSetting === 3 }">我的</span>
              <span v-else class="" @click="fileClick" :class="{ whiteText: cutSetting === 3 }">登录</span>
            </div>
          </el-col>
        </el-row>
        <!--会话-->
        <div v-show="cutSetting == 1">
          <!-- <input class="inputs" v-model="sessionSearch" style=" margin-top: 10px;" placeholder="会话名称" /> -->
          <!-- <div class="s-wrapper">
            <div v-for="sessionInfo in sessionList" :key="sessionInfo.id" @click="clickSession(sessionInfo)">
              <Session :sessionInfo="sessionInfo" :pcCurrent="sessionCurrent"></Session>
            </div>
          </div> -->
          <div class="myboby">

            <div class="fineTune boxinput" @click="delSession"
              style="    margin-top: 9%;margin-left: 0px;margin-right: 0px;width: 99%;">
              <svg t="1679215361568" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="3128" width="25" height="25">
                <path
                  d="M512.001024 0A512 512 0 0 0 0.001024 512a506.88 506.88 0 0 0 92.16 292.352V972.8a51.2 51.2 0 0 0 51.2 51.2H512.001024a512 512 0 0 0 0-1024z m0 921.6H194.561024v-134.144a51.2 51.2 0 0 0-10.24-30.72A406.016 406.016 0 0 1 102.401024 512a409.6 409.6 0 1 1 409.6 409.6z"
                  fill="#ffffff" p-id="3129"></path>
                <path
                  d="M716.801024 486.4a51.2 51.2 0 0 0-51.2 51.2 153.6 153.6 0 0 1-307.2 0 51.2 51.2 0 0 0-102.4 0 256 256 0 0 0 512 0 51.2 51.2 0 0 0-51.2-51.2z"
                  fill="#ffffff" p-id="3130"></path>
              </svg>
              清空当前会话
            </div>
          </div>
        </div>
        <!--会话-->
        <!--功能-->
        <div v-show="cutSetting == 0">
          <div class="myboby">
            <div class="online-person">
              <div class="person-cards-wrapper" style="max-height: 70vh;overflow: auto;">
                <div class="personList" v-for="personInfo in personList" :key="personInfo.id"
                  @click="clickPerson(personInfo)">
                  <PersonCard :personInfo="personInfo" :pcCurrent="pcCurrent"></PersonCard>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--功能-->
        <!--我的-->
        <div v-show="cutSetting == 3">
          <el-collapse-transition>
            <div class="myboby">
              <div v-show="SettingStatus == 4">
                <div class="sign">
                  <div class="sing_texts">
                    用户名:{{ user.username }}
                  </div>
                </div>
                <div class="sign">
                  <div class="sing_texts">
                    可用积分:{{ this.user.integral | numFilterReserved(2) }}
                  </div>
                </div>
                <div class="sign">
                  <div class="sing_texts">
                    邮箱:{{ this.user.email }}
                  </div>
                </div>
                <div class="bybutton">
                  <div class="fineTune boxinput" @click="blankurl"
                    style="margin-left: 0px;margin-right: 0px;width: 46%;float: left;">
                    购买卡密
                  </div>
                  <div class="fineTune boxinput" @click="isCrad"
                    style="margin-left: 6%;margin-right: 0px;width: 46%;float: left;">
                    卡密激活
                  </div>
                </div>
                <div class="roletext" v-show="is_role">
                  <div class="sign">
                    <input class="inputs" v-model="text_card" placeholder="请输入卡密" type="text"
                      style="width: 67%; margin-left: 0px;margin-right: 0px;" />
                    <div class="fineTune boxinput" @click="isopencard"
                      style="margin-left: 0%;margin-right: 0px;width: 30%;float: right;margin-top: 0px;">
                      确定
                    </div>
                  </div>
                </div>
                <div class="fineTune boxinput" @click="exitLogin"
                  style="    margin-top: 8%;margin-left: 0px;margin-right: 0px;width: 99%;">
                  退出登录
                </div>
              </div>
            </div>
          </el-collapse-transition>
          <!--登录-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 7">
              <div class="myboby">
                <div class="sign">
                  <div class="sing_text">
                    *用户名:
                  </div>
                  <input class="inputs" v-model="login.username" placeholder="请输入用户名" type="text"
                    style="width: 75%; margin-left: 0px;margin-right: 0px;" />
                </div>
                <div class="sign">
                  <div class="sing_text">
                    *密码:
                  </div>
                  <input class="inputs" v-model="login.password" placeholder="请输入密码" type="password"
                    style="width: 75%; margin-left: 0px;margin-right: 0px;" />
                </div>
                <div class="fineTune boxinput" @click="loginSubmit"
                  style="margin-left: 0px;margin-right: 0px;width: 99%;">
                  登录
                </div>
                <div class="fineTune boxinput" @click="SettingStatus = 6" :class="{ active: SettingStatus === 6 }"
                  style="margin-left: 0px;margin-right: 0px;width: 99%;">
                  注册
                </div>
              </div>
            </div>
          </el-collapse-transition>
          <!--登录结束-->
          <!--注册-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 6">
              <div class="myboby">
                <div class="sign">
                  <div class="sing_text">
                    *用户名:
                  </div>
                  <input class="inputs" v-model="sign.name" placeholder="请输入用户名" type="text"
                    style="width: 75%; margin-left: 0px;margin-right: 0px;" />
                </div>
                <div class="sign">
                  <div class="sing_text">
                    *密码:
                  </div>
                  <input class="inputs" v-model="sign.pwd" placeholder="请输入密码" type="password"
                    style="width: 75%; margin-left: 0px;margin-right: 0px;" />
                </div>
                <div class="sign">
                  <div class="sing_text">
                    *邮箱:
                  </div>
                  <input class="inputs" v-model="sign.email" placeholder="请输入邮箱" type="text"
                    style="width: 75%; margin-left: 0px;margin-right: 0px;" />
                </div>
                <div class="sign">
                  <div class="sing_text">
                    手机号:
                  </div>
                  <input class="inputs" v-model="sign.mobile" placeholder="请输入手机号" type="text"
                    style="width: 75%; margin-left: 0px;margin-right: 0px;" />
                </div>
                <div class="fineTune boxinput" @click="signSubmit" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                  注册
                </div>
              </div>
            </div>
          </el-collapse-transition>
          <!--注册结束-->
        </div>
        <!--我的-->
      </div>
    </div>
    <div class="chatRight" :style="computedStyle">
      <!-- <router-view></router-view> -->
      <div class="top-left" @click="toggleLeft">
        <svg t="1679366341860" class="icon" v-show="!showPersonList" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30">
          <path
            d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
            fill="#BDD2EF" p-id="5765"></path>
          <path
            d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
            fill="#2867CE" p-id="5766"></path>
        </svg>
        <svg t="1679366707602" class="icon" v-show="showPersonList" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="7551" width="30" height="30">
          <path
            d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
            fill="#BDD2EF" p-id="7552"></path>
          <path
            d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
            fill="#2867CE" p-id="7553"></path>
        </svg>
      </div>
      <div class="top-right" @click="toggleRight" v-show="isTopRight">
        <svg t="1679366707602" class="icon" v-show="!showSetupList" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="7551" width="30" height="30">
          <path
            d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
            fill="#BDD2EF" p-id="7552"></path>
          <path
            d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
            fill="#2867CE" p-id="7553"></path>
        </svg>
        <svg t="1679366341860" class="icon" v-show="showSetupList" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30">
          <path
            d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
            fill="#BDD2EF" p-id="5765"></path>
          <path
            d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
            fill="#2867CE" p-id="5766"></path>
        </svg>
      </div>
      <div v-show="showChatWindow">
        <ChatWindow ref="chatWindow" :user="user" :frinedInfo="chatWindowInfo" :settingInfo="SettingInfo"
          :storeStatu="storeStatus" @personCardSort="personCardSort" @update-parent-value="updateuserintegral">
        </ChatWindow>
      </div>
    </div>
    <div class="chatLeft" v-show="showSetupList">

      <div class="online-person">
        <el-row :gutter="20">
          <el-col :span="6"><span class="setting" @click="SettingStatus = 0"
              :class="{ active: SettingStatus === 0 }">功能</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 3"
              :class="{ active: SettingStatus === 3 }">开发中</span></el-col>
          <el-col :span="6">
            <span class="setting" @click="SettingStatus = 4" :class="{ active: SettingStatus === 4 }"
              v-if="is_login">我的</span>
            <span class="setting" @click="SettingStatus = 7" :class="{ active: SettingStatus === 7 }" v-else>登录</span>
          </el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 5"
              :class="{ active: SettingStatus === 5 }">会话</span></el-col>
        </el-row>

        <div class="s-wrapper" style="height: 68vh;">

          <div>

          </div>
          <!--对话设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 0">

              <!-- <div class="block">
                <el-tooltip class="item" effect="dark" content="开启读文模式" placement="top">
                  <span class="demonstration">开启读文模式</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.readefile" :width="defaulWidth"
                  style="margin-left: 15%;"></el-switch>
              </div>
              <div style="height: 30px;"></div> -->
            </div>
          </el-collapse-transition>
          <!--微调-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 3">
              <div class="fineTune boxinput" @click="" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                开发中
              </div>
            </div>
          </el-collapse-transition>

          <!--我的页面-->
          <!-- <el-collapse-transition>
            <div v-show="SettingStatus == 4">
              <div class="sign">
                <div class="sing_texts">
                  用户名:{{ user.username }}
                </div>
              </div>
              <div class="sign">
                <div class="sing_texts">
                  总余额：:${{ this.moneryInfo.totalGranted | numFilterReserved(2) }}
                </div>
              </div>
              <div class="sign">
                <div class="sing_texts">
                  可用余额：:${{ this.moneryInfo.totalAvailable | numFilterReserved(4) }}
                </div>
              </div>
              <div class="fineTune boxinput" @click="exitLogin" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                退出登录
              </div>
            </div>
          </el-collapse-transition> -->
          <!--登录-->
          <!-- <el-collapse-transition>
            <div v-show="SettingStatus == 7">
              <div class="sign">
                <div class="sing_text">
                  *用户名:
                </div>
                <input class="inputs" v-model="login.username" placeholder="请输入用户名" type="text"
                  style="width: 75%; margin-left: 0px;margin-right: 0px;" />
              </div>
              <div class="sign">
                <div class="sing_text">
                  *密码:
                </div>
                <input class="inputs" v-model="login.password" placeholder="请输入密码" type="password"
                  style="width: 75%; margin-left: 0px;margin-right: 0px;" />
              </div>
              <div class="fineTune boxinput" @click="loginSubmit" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                登录
              </div>
              <div class="fineTune boxinput" @click="SettingStatus = 6" :class="{ active: SettingStatus === 6 }"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                注册
              </div>
            </div>
          </el-collapse-transition> -->
          <!--登录结束-->
          <!--注册-->
          <!-- <el-collapse-transition>
            <div v-show="SettingStatus == 6">
              <div class="sign">
                <div class="sing_text">
                  *用户名:
                </div>
                <input class="inputs" v-model="sign.name" placeholder="请输入用户名" type="text"
                  style="width: 75%; margin-left: 0px;margin-right: 0px;" />
              </div>
              <div class="sign">
                <div class="sing_text">
                  *密码:
                </div>
                <input class="inputs" v-model="sign.pwd" placeholder="请输入密码" type="password"
                  style="width: 75%; margin-left: 0px;margin-right: 0px;" />
              </div>
              <div class="sign">
                <div class="sing_text">
                  邮箱:
                </div>
                <input class="inputs" v-model="sign.email" placeholder="请输入邮箱" type="text"
                  style="width: 75%; margin-left: 0px;margin-right: 0px;" />
              </div>
              <div class="sign">
                <div class="sing_text">
                  手机号:
                </div>
                <input class="inputs" v-model="sign.mobile" placeholder="请输入手机号" type="text"
                  style="width: 75%; margin-left: 0px;margin-right: 0px;" />
              </div>
              <div class="fineTune boxinput" @click="signSubmit" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                注册
              </div>
            </div>
          </el-collapse-transition> -->
          <!--注册结束-->
          <!--会话-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 5">

            </div>
          </el-collapse-transition>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Session from "@/components/Session.vue";
import ChatWindow from "./chatwindow.vue";
import { getToken, setToken, removeToken } from '@/util/auth';
import { sign, login, getrolelist, getuserinfo, isactivate } from "@/api/admin";
import PersonCard from "@/components/PersonCard.vue";

export default {
  name: "App",
  components: {
    ChatWindow,
    Session,
    PersonCard,
  },
  data() {
    return {
      sessionSearch: "",
      storeStatus: 0,
      //宽度
      defaulWidth: 70,
      //0是聊天设置，1是图片设置
      SettingStatus: 0,
      //0是模型列表，1是会话列表
      cutSetting: 0,
      //余额信息
      moneryInfo: {
        totalGranted: 0,
        totalUsed: 0,
        totalAvailable: 0
      },
      //全部的设置参数
      SettingInfo: {
        readefile: false,
        openProductionPicture: false,
        openChangePicture: false,
        KeyMsg: process.env.VUE_APP_OPENAI_API_KEY,
        n: 1,
        size: "256x256",
        fineTunes: {
          batch_size: "",
          model: "curie",
        }
      },
      //当前点击的模型
      pcCurrent: "",
      //当前点击的会话
      sessionCurrent: "",
      //角色列表
      personList: [],
      //会话列表
      sessionList: [],
      //模型列表缓存
      personListCache: [],
      //是否显示聊天窗口
      showChatWindow: true,
      //当前窗口的对话模型信息
      chatWindowInfo: {},
      // 是否隐藏模型列表和功能设置选择列表
      showPersonList: true,
      showSetupList: true,
      //----------------------------------
      //是否登录
      is_login: false,
      //注册表单
      sign: {
        name: '',//用户名
        pwd: '',//密码
        email: '',//邮箱
        mobile: '',//手机号
      },
      //登录表单
      login: {
        username: '',//用户名
        password: '',//密码
      },
      //用户
      user: {
        id: '',
        username: '',
        headImg: '',
        integral: '',
        email: '',
      },
      //窗口适应手机端设置
      chatLeftwidth: '22%',//右边框宽度
      is_chawindos: true,//展示聊天框
      chatRightwidth: '100%',//
      is_role: false,//开启卡密窗口
      text_card: '',//卡密
      isTopRight: true,//右侧显示边框开关
    };
  },
  computed: {
    computedStyle: function () {
      // 动态计算并返回样式对象
      return {
        width: this.chatRightwidth,
        // margin: '1% 0 0 0',
      };
    }
  },
  created() {
    if (this.isLogin()) {//判断是否登录 
      this.getusers();//拉去我的个人信息
    }
    window.addEventListener('resize', this.handleResize)
    this.handleResize()//监控屏幕尺寸
  },

  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    this.getrole()//获取角色列表
    if (this.SettingInfo.KeyMsg) {
      this.getModelList(this.SettingInfo.KeyMsg);
    }
    // 在Vue实例中添加监听函数
    this.$watch('SettingInfo.KeyMsg', this.watchKeyMsg);

  },
  filters: {
    //截取数据到小数点后几位
    numFilterReserved(value, digit) {
      return parseFloat(value).toFixed(digit)
    }
  },
  watch: {
    SettingInfo: {
      handler: function (newVal, oldVal) {
        if (newVal.openChangePicture) {
          this.SettingInfo.openProductionPicture = false
        }
        if (newVal.openProductionPicture) {
          this.SettingInfo.openChangePicture = false
        }
        if (newVal.fineTunes.batch_size) {
          this.SettingInfo.fineTunes.batch_size = parseInt(newVal.fineTunes.batch_size)
        }
        if (newVal.fineTunes.learning_rate_multiplier) {
          this.SettingInfo.fineTunes.learning_rate_multiplier = parseInt(newVal.fineTunes.learning_rate_multiplier)
        }
        if (newVal.fineTunes.classification_n_classes) {
          this.SettingInfo.fineTunes.classification_n_classes = parseInt(newVal.fineTunes.classification_n_classes)
        }
        if (newVal.fineTunes.classification_positive_class) {
          this.SettingInfo.fineTunes.classification_positive_class = parseInt(newVal.fineTunes.classification_positive_class)
        }
        if (newVal.fineTunes.classification_betas) {
          this.SettingInfo.fineTunes.classification_betas = newVal.fineTunes.classification_betas.split(",").map(str => parseInt(str))
        }
      },
      deep: true
    }
  },
  methods: {
    //跳转卡密
    blankurl() {
      window.open('', '_blank');
    },
    //计算积分
    updateuserintegral(integral) {
      this.user.integral = this.user.integral - integral;
    },
    //激活卡密
    async isopencard() {
      if (!this.text_card) {
        this.$message({
          showClose: true,
          message: '卡密不可为空',
          type: 'error'
        });
        return false;
      }
      let params = {
        close: this.text_card,
      };
      let data = await isactivate(params);
      if (data.code === 200) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: 'success'
        });
        this.getusers();
      } else {
        this.$message({
          showClose: true,
          message: data.msg,
          type: 'error'
        });
      }
    },
    //拉取个人信息
    async getusers() {
      let data = await getuserinfo();
      if (data.code === 200) {
        this.user = data.data;
      }
    },
    //激活卡密
    isCrad() {
      this.is_role = !this.is_role;
    },
    //获取角色列表
    async getrole() {
      let data = await getrolelist();
      if (data.code === 200) {
        this.personList = data.data;
        this.clickPerson('');
      } else {
        this.$message.error(data.msg);
      }
    },
    clickPerson(info) {
      if (info === '') {
        this.showChatWindow = true;
        this.chatWindowInfo = this.personList[0];
        this.personInfo = this.personList[0];
        this.pcCurrent = this.personList[0].id;
      } else {
        this.showChatWindow = true;
        this.chatWindowInfo = info;
        this.personInfo = info;
        this.pcCurrent = info.id;
        if (window.innerWidth <= 768) {
          this.showPersonList = !this.showPersonList;
          this.is_chawindos = !this.is_chawindos;
        }
      }

    },
    //判断是否登录
    isLogin() {
      //是否登录
      if (getToken('token')) {
        // this.user = JSON.parse(getToken('admin'));
        this.user.headImg = 'http://shop.aifx.top/images/yonghu.jpeg';
        this.is_login = true;
        return true;
      } else {
        this.fineTuningInfo = {};
        this.SettingStatus = 7;
        this.cutSetting = 3;
        this.$message.error('请先登录!');
        //如果是手机端,没有登录切换登录页面出来
        if (window.innerWidth <= 768) {
          this.toggleLeft();//没有登录打开登录
        }
        return false;
      }
    },
    // 点击切换显示状态
    toggleLeft() {
      this.isMoblie();
      this.showPersonList = !this.showPersonList;
      this.showChatWindow = !this.showChatWindow;

    },
    //适应手机端设置
    isMoblie() {
      if (window.innerWidth <= 768) {
        this.chatLeftwidth = '95%';
        this.chatRightwidth = '5%';
        this.is_chawindos = !this.is_chawindos;
      }
    },
    toggleRight() {
      this.showSetupList = !this.showSetupList;
    },
    //监听窗口尺寸的变化
    handleResize() {
      if (window.innerWidth <= 1150) {
        this.isTopRight = false;//手机端右侧关闭
        this.showPersonList = false;
        this.showSetupList = false;
        this.showChatWindow = true;

      } else {
        this.showPersonList = true;
        this.showSetupList = true;
      };
    },

    //清空会话
    delSession() {
      this.$refs.chatWindow.deletelist();
    },
    //模型列表被点击
    modelClick() {
      //清除被点击的微调对象
      this.fineTuningInfo = {};
      this.SettingStatus = 0
      this.cutSetting = 0
      // this.showChatWindow = false;
    },
    //会话列表被点击
    sessionClick() {
      this.SettingStatus = 5
      this.cutSetting = 1

    },

    //微调模型列表被点击
    fineTuningClick() {
      this.SettingStatus = 3;
      this.cutSetting = 2
    },

    //我的被点击
    fileClick() {
      if (this.is_login) {
        //已登录
        this.getusers();//拉去个人信息
        this.fineTuningInfo = {};
        this.SettingStatus = 4;
        this.cutSetting = 3;
        this.is_login = true;
      } else {
        //注册
        this.fineTuningInfo = {};
        this.SettingStatus = 7;
        this.cutSetting = 3
      }

    },
    //会话被点击
    clickSession(info) {
      this.sessionCurrent = info.id;
      this.$refs.chatWindow.assignmentMesList(info.dataList)
    },

    //注册按钮
    async signSubmit() {
      let params = this.sign;
      let data = await sign(params);
      if (data.code === 200) {
        this.$message({
          message: data.msg,
          type: 'success'
        });
        this.SettingStatus = 7;
        this.login.username = this.sign.name;
        this.login.password = this.sign.pwd;
      } else {
        this.$message.error(data.msg);
      }

    },
    //登录按钮
    async loginSubmit() {
      let params = this.login;
      let data = await login(params);
      if (data.code === 200) {
        this.$message({
          message: data.msg,
          type: 'success'
        });
        setToken('token', data.token, 1000000);//登录成功存入cookie
        setToken('admin', JSON.stringify(data.data), 1000000);//用户信息存入cookie
        this.getusers();
        this.is_login = true;//登录打开
        this.SettingStatus = 4;//栏目跳到4 我的页面
        this.$nextTick(() => {//等渲染好,加载组件的获取聊天记录方法
          this.$refs.chatWindow.getFriendChatMsg()
        });

      } else {
        this.$message.error(data.msg);
      }
    },
    //退出登录
    exitLogin() {
      this.is_login = false;
      this.user = [];
      this.SettingStatus = 7;
      removeToken('token');
      removeToken('admin');
    },
    personCardSort(id) {
      if (id !== this.personList[0].id) {
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].id == id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.bybutton {
  width: 100%;
  height: 7vh;
}

.myboby {
  padding: 1px 41px;
}

.top-left,
.top-right {
  position: absolute;
  top: 5px;
  cursor: pointer;
}

.top-left {
  left: 5px;
}

.top-right {
  right: 5px;
}

.boxinput {
  height: 30px;
  line-height: 50px;
  color: #fff;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 90%;
  text-align: center;
  height: 50px;
  background-color: rgb(66, 70, 86);
  border-radius: 15px;
  border: 1px solid rgb(80, 85, 103);
  position: relative;
  cursor: pointer;
}

.icon {
  margin-right: 10px;
  vertical-align: middle;
}

.send {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(66, 70, 86);
  border: 0;
  transition: 0.3s;
  box-shadow: 0px 0px 5px 0px rgb(84, 89, 110);

  &:hover {
    box-shadow: 0px 0px 10px 0px rgb(91, 219, 239);
  }
}

.weitiao {
  margin-top: 10px;
  width: 100%;
  margin-left: 0px;
  margin-right: 0px;
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

  &:focus {
    outline: none;
  }
}

.fineTune {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(66, 70, 86);
  border: 0;
  transition: 0.3s;
  box-shadow: 0px 0px 5px 0px rgb(84, 89, 110);

  &:hover {
    box-shadow: 0px 0px 10px 0px rgb(29, 144, 245);
  }
}

.inputs {
  width: 65%;
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

.whiteText {
  color: #fff;
}

::v-deep .el-input__inner {
  background-color: transparent;
  color: #409EFF;
}

.setting {
  margin-left: 0px;
  padding-left: 10px;
  color: rgb(176, 178, 189);
}

.setting.active {
  color: #fff; // 选中后的颜色
}

.setting:hover {
  cursor: pointer;
}

#jianbian {
  background-color: rgb(39, 42, 55);
  border-color: #409EFF;
  color: #fff;
  border-width: 0px;
}

.astrict {
  width: 90%;
}

.settingButton {
  width: 99%;
}

.block {
  margin-top: 5%;

  .demonstration {
    color: aliceblue;
    text-align: center;
  }
}

.inputs {
  width: 90%;
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

.chatHome {
  // margin-top: 20px;
  display: flex;

  .chatLeft {
    width: 280px;
    margin-top: 29px;

    .title {
      color: #fff;
      padding-left: 10px;
    }

    .online-person {
      margin-top: 10%;

      .onlin-text {
        margin-left: 20%;
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }

      .s-wrapper {
        padding-left: 10px;
        height: 70vh;
        margin-top: 10px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          width: 0;
          /* Safari,Chrome 隐藏滚动条 */
          height: 0;
          /* Safari,Chrome 隐藏滚动条 */
          display: none;
          /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 20px;

    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      /*垂直居中 */
      left: calc(50% - 50px);

      /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }

  .sign {
    width: 100%;
    height: 50px;
    margin-top: 5%;

    .sing_text {
      float: left;
      width: 25%;
      color: #fff;
      line-height: 50px;
      font-size: 16px;
    }

    .sing_texts {
      float: left;
      width: auto;
      color: #fff;
      line-height: 50px;
      font-size: 16px;
    }
  }
}
</style>