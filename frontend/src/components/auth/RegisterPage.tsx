import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function RegisterPage() {
  return (
    <> 
        <div className="h-screen w-screen flex justify-center items-center  bg-gray-100">
        <Card className="w-full max-w-sm bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
             <div className="grid gap-2">
              <Label htmlFor="firstname">Firstname</Label>
              <Input
                id="firstname"
                type="firstname"
                placeholder="Tyler"
                required
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="lastname">Lastname (optional)</Label>
              <Input
                id="lastname"
                type="lastname"
                placeholder="Durden"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="bob@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>  
              </div>
              <Input id="password" type="password" required  placeholder="••••••••"/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full !bg-blue-50 text-black">
          Register
        </Button>
      </CardFooter>
    </Card>    
    </div>
    </>
  )
}
