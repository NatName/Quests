<template>
  <div>
    <table class="table table-bordered  table-main">
      <thead >
        <tr>
          <td v-for="quest in quests">{{quest["alias"]}}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td  v-for="quest in quests" v-if="quest['status'] === 'SUCCESS'" @click="goTodetail(quest['alias'])">&#10004</td>
          <td v-for="quest in quests" v-if="quest['status'] === 'CRASH'" @click="goTodetail(quest['alias'])">&#10006</td>
          <td v-for="quest in quests" v-if="quest['status'] === 'NO_DATA'" @click="goTodetail(quest['alias'])">	&#8212</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

  import {APIService} from '../APIService';
  const apiService = new APIService();

  export default {
    name: 'ListQuests',
    components: {

    },
    data() {
      return {
        quests: []
      };
    },

    methods: {

      getQuests(){
        apiService.getInfoQuests().then((data) => {
          this.quests = data;
        }).catch((err) => console.log(err));
      },
      goTodetail(nameQuest) {
        this.$router.push({name:'info',params:{nameQuest}})
      },
    },
    mounted() {
      this.getQuests();
      },
  }

</script>

<style scoped>
  .table-main,
  .table-main th,
  .table-main td {
    border: 1px solid black;
    text-align: center;
  }
  .table-main tbody td:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
</style>
