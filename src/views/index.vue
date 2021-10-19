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
                    :label-col="{span: 4}"
                    :wrapper-col="{span: 14}"
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
                        <a-list-item @dblclick="editTodo(item)">
                            <a-checkbox v-model:checked="item.checked"></a-checkbox>
                            <a-input
                                v-if="item === editingTodo"
                                v-model:value="item.name"
                                v-editing-focus="item === editingTodo"
                                @keyup.enter="doneEdit(item)"
                                @keyup.esc="cancleEdit(item)"
                            />
                            <div v-else>{{item.name}}</div>
                            <template #actions>
                                <a @click="remove(index)">del</a>
                            </template>
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
// 基础数据
const formRef = ref()
const rules = {
    name: { required: true, message: 'Please input Activity name', trigger: 'blur' },
}

const dataList = ref([
    { name: 'qw' },
    { name: 'qw' },
])

// 1. 添加待办事件
const useAdd = todos => {
    const formState = reactive({
        name: '',
    })
    const onSubmit = () => {
        formRef.value
            .validate()
            .then(() => {
                todos.value.unshift({ name: formState.name, checked: false })
            })
            .catch(error => {
                console.log('error', error)
            })
    }
    return {
        formRef,
        formState,
        onSubmit,
    }
}

// 2. 删除代办事件
const useDel = todos => {
    const remove = (index) => {
        dataList.value.splice(index, 1)
    }
    return {
        remove,
    }
}

// 3. 编辑代办项
const useEdit = () => {
    let beforeEditingText = '12'
    const editingTodo = ref(null)
    // 双击显示编辑
    const editTodo = (todo) => {
        // 编辑前的值
        beforeEditingText = todo.name
        // 记录正在编辑的项
        editingTodo.value = todo
    }
    // enter 完成编辑
    const doneEdit = todo => {
        editingTodo.value = null
    }
    // esc 取消编辑
    const cancleEdit = todo => {
        editingTodo.value = null
        todo = beforeEditingText
    }
    return {
        editingTodo,
        editTodo,
        doneEdit,
        cancleEdit,
    }
}

export default defineComponent({
    name: 'Todos',
    setup () {
        const resetForm = () => {
            formRef.value.resetFields()
        }

        return {
            formRef,
            rules,
            dataList,
            useDel,
            resetForm,
            ...useAdd(dataList),
            ...useDel(dataList),
            ...useEdit(),
        }
    },
    directives: {
        editingFocus: (el, binding) => {
            if (binding.value) {
                el.focus()
            }
        },
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
