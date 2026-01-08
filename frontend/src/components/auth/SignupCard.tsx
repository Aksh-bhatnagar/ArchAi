import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function SignupCard() {
  return (
    <>
        <Card className="w-full max-w-sm bg-transparent text-white border-none shadow-none z-10">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Start designing your first floor plan today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6 border-none">
                
                <div className="grid gap-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    type="firstname"
                    placeholder="John"
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    type="lastname"
                    placeholder="Doe"
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rust@example.com"
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className='w-full'>Signup</Button>
          </CardFooter>
        </Card>
       </>
  )
}
