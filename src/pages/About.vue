<template>
	<div class="aboutWrap">
        {{index}}
	</div>
</template>
<script type="text/javascript">
	import { mapGetters } from 'vuex';
	export default{
		data () {
			return {
				//index:0
			}
    },
    computed : {
        ...mapGetters([
            'index'
        ])
    },
		mounted (){
        
    },
    watch:{
        
    },
		components : {
      
		},
		methods : {
			
		}
	}
</script>
<style type="text/css" lang="less">
	.aboutWrap{

  }
</style>