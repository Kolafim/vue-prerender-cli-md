<template>
  <div class="material-icon">
    <h2 class="page-head-name">{{ msg }}</h2>
    <p class="des">编码方式兼容更好:<span class="light">&#x[code];</span></p>
    <ul class="icon-list flex">
      <li v-for="icon in icons_map" class="icon-item">
        <i class="material-icons" v-html="icon.key"></i>
        <p><span>{{icon.name}}</span><span>{{icon.key}}</span></p>
      </li>
    </ul>
    <!-- <i class="material-icons">face</i> -->
  </div>
</template>

<script>
import icons from './../assets/js/material-icons.map'
export default {
  data () {
    return {
      msg: 'Material Icons'
    }
  },
  computed:{
    icons_map(){
      let list = [];
      // console.log(icons.icons);
      for(let item in icons.icons){
        if(icons.icons[item].name) {
          list.push({
            key:`&#x${item};`,
            name:icons.icons[item].name.toLowerCase().replace(/\s/g,"_")
          });
        }
      }
      console.log(list);
      return list;
    }
  }
}
</script>

<style lang="scss" scoped>
  .material-icon{
    
    .des {
      color:#999;

      span{
        margin:0 6px;
        font-weight: 600;
      }
    }
    .icon-list{
      margin:30px 0;
      flex-wrap:wrap;
      text-align:left;

      .icon-item{
        display: block;
        width:21%;
        min-width:300px;
        margin:10px 0;

        i{
          margin-right:8px;
        }
        p{
          color:#bbb;
          font-size: 14px;

          span:last-child:before {
            content:'';
            display: inline-block;
            width:0;
            height:14px;
            vertical-align: middle;
            border-left:1px solid #ddd;
            margin:0 4px;
          }
        }

        i, p{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
</style>
