<template>
<div v-if="this.isNameQuest">
  <table class="table table-hover " >
    <thead>
        <th>Build ID</th>
        <th>Platform</th>
        <th>Quest Name</th>
    </thead>
    <tbody>
        <th>{{this.currentQuest["globalId"]}}</th>
        <th>{{this.currentQuest["platform"]}}</th>
        <th>{{this.currentQuest["name"]}}</th>
    </tbody>
  </table>
  <h1 class="text-center">PathWays</h1>
  <table class="table table-hover table-quest">
    <thead>
        <th>Status</th>
        <th>Path name</th>
        <th>Leafs info</th>
    </thead>
    <tbody>
        <th>{{this.currentQuest["pathway"]["status"]}}</th>
        <th>{{this.currentQuest["pathway"]["name"]}}</th>
        <th>
          <div class="container">
            <h6 v-for="leaf in this.finishedQuests" v-if="defineId(leaf) && checkLastLeafs() ">&#10004&#8594</h6>
            <h6>&#10004 </h6>
          </div>
        </th>
    </tbody>
  </table>
</div>
<div  v-else>
  <div class="error">
    <img src="../assets/calendar.png">
  </div>
  <h1 class="text-center">Quest info not found</h1>
  <h2 class="text-center">For more information, please contact the developers</h2>
</div>
</template>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .table td,
  .table th {
    border: 0;
    text-align: center;
  }
  table {
    vertical-align: middle;
    border-bottom: 1px solid #dee2e6;
  }

  .table-quest tbody th {
    background-color: lightgrey;
  }
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<script>
import {APIService} from '../APIService';
const apiService = new APIService();

  export default {
    name: 'info',
    data() {
      return {
        name: this.$route.params.nameQuest,
        filterQuests: [],
        currentQuest: {},
        finishedQuests : [],
        count: 0,
        isNameQuest: true
      };
    },

    methods: {

      getUniqueQuests() {
        apiService.getGeneralQuests().then((data) => {
          this.filterQuests = data.filter((obj, pos, arr) => {
              return arr.map(mapObj => mapObj["alias"]).indexOf(obj["alias"]) === pos;
          });
          this.isNameQuest = this.filterQuests.some((temp) => {
              this.currentQuest = temp;
              return temp["alias"] == this.name;
            });
        }).catch(err => console.log(err));
      },
      getFinishedQuests() {
        apiService.getFinishedQuests().then((data) => {
          this.finishedQuests = data;
        }).catch(err => console.log(err))
      },
      defineId(leaf) {
        return this.currentQuest["id"] === leaf["questId"];
      },
      checkLastLeafs() {
        const leafs = this.finishedQuests.filter(temp => temp["questId"] === this.currentQuest["id"]).length;
        this.count++;
        if(this.count < leafs) {
          return true
        } else {
          this.count = 0;
          return false;
        }
      }
    },
    mounted() {
       this.getUniqueQuests();
       this.getFinishedQuests();
      },
  }

</script>
