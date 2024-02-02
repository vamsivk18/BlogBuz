import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {
  return (
    <div className='flex flex-col max-w-3xl mx-auto pt-10 p-4 gap-4 min-h-screen'>
        <h2 className='text-center text-3xl font-semibold'>Create a post</h2>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col sm:flex-row w-full gap-2'>
                <TextInput type='text' placeholder='Title' className='w-full sm:w-2/3'></TextInput>
                <Select className='w-full sm:w-1/3'>
                    <option value="uncategorized">Select a category</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="FullStack">FullStack</option>
                </Select>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 p-1 border-2 rounded  w-full justify-between sm:p-4 border-dotted sm:border-4 border-[#3396b5]'>
                <FileInput type='file' accept='image/*'></FileInput>
                <Button outline gradientDuoTone='purpleToBlue'>Upload Image</Button>
            </div>
            <ReactQuill theme='snow' placeholder='Write Something...' className='h-72 mb-12'></ReactQuill>
            <Button gradientDuoTone='purpleToPink'>Publish</Button>
        </form>

    </div>
  )
}

export default CreatePost