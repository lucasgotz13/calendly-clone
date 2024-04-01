"use client"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export const LoginContainer = () => {
  const { username, password, isUserValid, setUsername, setPassword, setIsUserValid } = useAuthStore((state) => state)
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      if (!response.ok) {
        setIsUserValid(false)
        throw new Error("Login Failed")
      }
      setIsUserValid(true)
      const { token } = await response.json()
      document.cookie = `token=${token}; path=/`
      router.push("/admin")
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className="mt-10 p-5 container max-w-sm">
      <h1 className="text-5xl text-center font-bold mb-5">Login</h1>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <Label htmlFor="username" className="font-bold">Username:</Label>
          <Input id="username" type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password" className="font-bold">Password:</Label>
          <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {isUserValid === false && <p className="text-red-500 underline">Incorrect credentials</p>}
        <Button>Submit</Button>
      </form>
    </div>
  )
}
