<template>
  <div>
    <div style="height: 640px;background-color: #ffffff;
    overflow: hidden;">
      <div class="u-box">
        <div class="u-header">
          <div class="u-info">
            <img src="@/assets/header/b-Girl.jpg" alt="头像">
            <div class="u-name">
              <p class="n-text">我是DJ</p>
              <p class="n-num">username</p>
            </div>
            <div class="u-jurisdiction">
              <p class="j-title">管理员</p>
              <p class="j-password">修改密码</p>
            </div>
          </div>
        </div>
        <div class="u-body">
          <p class="u-information">联系方式</p>
          <div class="i-box">
            <div class="i-company">
              <i class="iconfont icon-company"></i>
              <div class="i-context">
                <p>杭州工程管理有限公司</p>
              </div>
              <i class="iconfont icon-modify"></i>
            </div>
            <div class="i-company">
              <i class="iconfont icon-WeChat"></i>
              <div class="i-context">
                <p>wx199299</p>
              </div>
              <i class="iconfont icon-modify"></i>
            </div>
            <div class="i-company">
              <i class="iconfont icon-phone"></i>
              <div class="i-context">
                <p>18989477589</p>
              </div>
              <i class="iconfont icon-modify"></i>
            </div>
            <div class="i-company">
              <i class="iconfont icon-mail"></i>
              <div class="i-context">
                <p>18989477589@163.com</p>
              </div>
              <i class="iconfont icon-modify"></i>
            </div>
          </div>
          <div class="u-submit">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "userCenter"
}
</script>

<style scoped lang="scss">
  .u-box{
    overflow: hidden;
    .u-header{
      width:100%;
      height:230px;
      background: url("../../assets/userinfo/userInfo.png") no-repeat;
      background-size: cover;
      overflow: hidden;
      border-radius:3px 3px 0 0;
      .u-info{
        margin: 80px auto;
        height: 100px;
        width: 300px;
        display: flex;
        justify-content: space-around;
        img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        .u-name{
          line-height: 40px;
          .n-text{
            font-size:22px;
            color:#ffffff;
          }
          .n-num{
            font-size:14px;
            color:#ffffff;
          }
        }
        .u-jurisdiction{
          line-height: 67px;
          .j-title{
            width:46px;
            height:18px;
            background:rgba(111,221,232,1);
            border-radius:4px;
            color: #ffffff;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            margin-top: 10px;
          }
          .j-password{
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
    }
    .u-body{
      width: 450px;
      margin: 50px auto;
      .u-information{
        font-size:14px;
        color:rgba(102,102,102,1);
      }
      .i-box{
        margin-top: 25px;
        height: 100px;
        display: flex;
        justify-content: space-between;
        flex-flow:row  wrap;
        i{
          color: #999999;
          font-size: 18px;
        }
        .i-company{
          width: 45%;
          height: 40px;
          line-height: 40px;

          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(218,218,218,1);
          .i-context{
            width: 150px;
            p{
              width: 150px;
              text-align: left;
              font-size: 14px;
              color: #666666;
            }
          }

        }
      }
      .u-submit{
        width:160px;
        height:30px;
        color: #ffffff;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        background:rgba(102,102,102,1);
        border-radius:6px;
        margin: 70px auto;
        cursor: pointer;
      }
    }

  }
</style>
