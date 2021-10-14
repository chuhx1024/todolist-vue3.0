<template>
    <div class="index-container">
        <a-layout>
            <a-layout-header>TODOLISTS</a-layout-header>
            <a-layout-content>
                <h1>todos</h1>
                <a-form
                    ref="formRef"
                    :model="formState"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-item ref="name" label="Add" name="name">
                        <a-input v-model:value="formState.name" />
                    </a-form-item>
                    <div>
                        <a-button type="primary" @click="onSubmit">Create</a-button>
                        <a-button style="margin-left: 10px;" @click="resetForm">Reset</a-button>
                    </div>
                </a-form>
                <a-list
                    class="demo-loadmore-list"
                    item-layout="horizontal"
                    :data-source="dataList"
                >
                    <template #renderItem="{ item, index }">
                        <a-list-item>
                            <template #actions>
                                <a @click="handelDel(index)">del</a>
                            </template>
                            <div>{{item.name}}</div>
                        </a-list-item>
                    </template>
                </a-list>
            </a-layout-content>
            <a-layout-footer></a-layout-footer>
        </a-layout>
    </div>
</template>

<script>
import { defineComponent, reactive, ref } from '@vue/runtime-core'

export default defineComponent({
    name: 'Todos',
    setup () {
        const formRef = ref()
        const formState = reactive({
            name: '',
        })
        const dataList = reactive([
            { name: 'qw' },
            { name: 'qw' },
        ])
        const rules = {
            name: { required: true, message: 'Please input Activity name', trigger: 'blur' },
        }
        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    dataList.push({ name: formState.name })
                })
                .catch(error => {
                    console.log('error', error)
                })
        }
        const resetForm = () => {
            formRef.value.resetFields()
        }
        const handelDel = (index) => {
            dataList.splice(index, 1)
        }
        return {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
            formState,
            rules,
            formRef,
            dataList,
            onSubmit,
            handelDel,
            resetForm,
        }
    },

})
</script>

<style lang='less' scoped>
    .index-container {
        /deep/.ant-layout {
            height: 100vh;
            text-align: center;

            .ant-layout-header {
                color: #fff;
            }

            .ant-layout-content {
                padding: 100px 300px;
            }
        }
    }

</style>
