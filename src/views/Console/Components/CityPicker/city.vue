<template>
    <div style="overflow: hidden;">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-select v-model="provinceValue" @change="handleProvince">
                    <el-option v-for="item in city.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="cityValue" @change="handleCity">
                    <el-option v-for="item in city.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="areaValue" @change="handleArea">
                    <el-option v-for="item in city.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="streetValue" @change="handleStreet">
                    <el-option v-for="item in city.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { GetCityPicker } from '../../../../api/user.js'
export default {
    name: 'cityPicker',
    data(){
        return{
            provinceValue: '',
            cityValue: '',
            areaValue: '',
            streetValue: '',
            city: {
                provinceData: [],
                cityData: [],
                areaData: [],
                streetData: []
            }
        }
    },
    props: {
        cityPickerData: {
            type: Object,
            default: () => {}
        }
    },
    watch: {

    },
    created(){
        this.getProvince()
    },
    methods: {
        //获取省份
        getProvince(){
            let requestData = {
                type: 'province'
            }
            GetCityPicker(requestData).then( response => {
                this.city.provinceData = response.data.data.data
            }).catch( error => {

            })
        },
        //选择省份，获取城市
        handleProvince(provinceValue){
            this.resetValue({type: 'city'})
            let requestData = {
                type: 'city',
                province_code : provinceValue
            }
            GetCityPicker(requestData).then( response => {
                console.log(response)
                this.city.cityData = response.data.data.data
            }).catch( error => {

            })
            this.$emit('cityChanged',{provinceValue: this.provinceValue,cityValue: this.cityValue,areaValue: this.areaValue, streetValue: this.streetValue})
        },
        //选择city，获取area
        handleCity(cityValue){
            this.resetValue({type: 'area'})
            let requestData = {
                type: 'area',
                city_code : cityValue
            }
            GetCityPicker(requestData).then( response => {
                console.log(response)
                this.city.areaData = response.data.data.data
            }).catch( error => {

            })
            this.$emit('cityChanged',{provinceValue: this.provinceValue,cityValue: this.cityValue,areaValue: this.areaValue, streetValue: this.streetValue})
        },
        //选择area，获取street
        handleArea(areaValue){
            this.resetValue({type: 'street'})
            let requestData = {
                type: 'street',
                area_code : areaValue
            }
            GetCityPicker(requestData).then( response => {
                console.log(response)
                this.city.streetData = response.data.data.data
            }).catch( error => {

            })
            this.$emit('cityChanged',{provinceValue: this.provinceValue,cityValue: this.cityValue,areaValue: this.areaValue, streetValue: this.streetValue})
        },
        handleStreet(){
            this.$emit('cityChanged',{provinceValue: this.provinceValue,cityValue: this.cityValue,areaValue: this.areaValue, streetValue: this.streetValue})
        },
        //重置选项
        resetValue(parms){
            const valueJson = {
                city:['cityValue','areaValue','streetValue'],
                area:['areaValue','streetValue'],
                street: ['streetValue']
            }
            const arrObj = valueJson[parms.type]
            //清空指定key值
            arrObj.forEach(item => {
                this[item] = ''
            });
        }
    }
}
</script>
<style lang="scss" scoped>

</style>