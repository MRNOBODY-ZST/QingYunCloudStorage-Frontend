import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface User {
    id?: string
    uuid?: string
    username?: string
    userPict?: string
    email?: string
    role?: string
    status?: string
    createTime?: Date
    updateTime?: Date
}

export const useUserStore = defineStore('user', () => {
    const token = ref<string | null>(localStorage.getItem('userToken'))
    const user = ref<User | null>(
        (() => {
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
                try {
                    return JSON.parse(storedUser)
                } catch (error) {
                    console.log(error)
                    return null
                }
            }
            return null
        })(),
    )

    const isLoggedIn = computed(() => !!token.value)

    function setUser(newUser: User) {
        user.value = newUser
        localStorage.setItem('user', JSON.stringify(user.value))
    }

    function setToken(newToken: string) {
        token.value = newToken
        localStorage.setItem('userToken', newToken)
    }

    function clearToken() {
        token.value = null
        localStorage.removeItem('userToken')
    }

    function clearUser() {
        user.value = null
        localStorage.removeItem('user')
    }

    function logout() {
        clearToken()
        clearUser()
    }

    return {
        token,
        user,
        setToken,
        setUser,
        clearToken,
        clearUser,
        logout,
        isLoggedIn,
    }
})
