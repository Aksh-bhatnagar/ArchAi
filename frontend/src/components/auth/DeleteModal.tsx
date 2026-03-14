import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function DeleteModal() {
  return (
    <div className="absolute top-0 h-screen w-screen z-25 flex justify-center items-center backdrop-blur-xs">
      {/* <div className=" bg-slate-900 h-50 w-80 rounded-2xl shadow-2xl shadow-black p-4 flex flex-col justify-between">
        <div>
        <Label className="text-slate-300 font-medium py-2">
          Rename Project <span className="text-red-400">*</span>
        </Label>
        <Input
          placeholder="My Dream Home"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className={`bg-slate-900/50 border-slate-600 text-white `}
        />
        </div>
        <div className="flex justify-between">
            <Button className="text-rose-500! bg-transparent!" onClick={onClose}>Cancle</Button>
            <Button onClick={handleRename}>Rename</Button>
        </div>
      </div> */}
    </div>
  )
}
