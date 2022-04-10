<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import Multiselect from "vue-multiselect";
const accessService = require('../../../axios');
/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Dashboard",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
    Multiselect
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Dashboards",
          href: "/",
        },
        {
          text: "Default",
          active: true,
        },
      ],
      language: ["php","nodejs"],
      selectedLanguage:null,
      newSelectedLanguage:"",
      code:"",
      result:null,
      status:null,
      progress:false
    };
  },
  watch:{
    selectedLanguage(value){
      this.newSelectedLanguage=String(value);
    }
  },
  methods: {
    async submitForm(){
      this.progress=true
      let payload={
        "language":this.newSelectedLanguage,
        "script":this.code
      }
      const res = await accessService.default.post("compiler", payload);
      console.log(res.data);
      if(res.data.statusCode==200){
        this.status=true
      }else{
        this.status=false
      }
      this.result=res.data.output
      this.progress=false
    }
  },
  mounted() {
    setTimeout(() => {
      this.showModal = true;
    }, 1500);
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="card">
            <div class="card-body">
              <h4 class="card-title mb-3">Compiler</h4>
    <div class="row">
      <div class="col-sm-6">
        <div class="mb-3">
          <label for="brand">Language</label>
          <multiselect 
              v-model="selectedLanguage" 
              :options="this.language"
              :searchable="true"
              placeholder="Seçiniz"
              selectLabel="Seçiniz"
              deselectLabel="Seçimi Kaldır"
              selectedLabel="Seçilen">
              <span slot="noResult">Oops! Öğe bulunamadı. Arama sorgusunu değiştirmeyi deneyin.</span>
          </multiselect>
        </div>
        <div class="mb-3">
            <label for="name">Code</label>
          <textarea
            v-model="code"
            id="model"
            name="model"
            type="text"
            class="form-control"
            placeholder="code..."
          />
        </div>               
      </div>
      <div class="col-sm-6">
        <div class="mb-3">
            <label for="name">Result---></label>
            <label for="name1" v-if="this.status==true"> Success</label>
            <label for="name2" v-if="this.status==false"> Error</label>
          <textarea
            v-model="result"
            id="model"
            name="model"
            type="text"
            class="form-control"
            placeholder="result"
            disabled=false
          />
        </div>               
      </div>
      <div class="d-grid mt-4">
        <div class="d-grid gap-2">
          <button block type="submit" class="btn btn-success" v-on:click="submitForm" :disabled="this.progress || this.newSelectedLanguage=='' || this.code==''">
            <i class="bx bx-loader bx-spin font-size-16 align-middle me-2" v-if="this.progress"></i>
            RUN AND SHOW 
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  </Layout>
</template>
