import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { Trash2Icon, UploadIcon } from 'lucide-react'
import { useCallback } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

export type ImageState = {
  id: string
  file: File
  uploading: boolean
  progress: number
  key?: string
  isDeleting: boolean
  error: boolean
  objectUrl?: string
}

type ImageUploaderProps = {
  image: ImageState | null
  setImage: (image: ImageState | null) => void
}

export default function ImageUploader({ image, setImage }: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 1) {
        setImage({
          id: 'asdf',
          file: acceptedFiles[0],
          uploading: false,
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(acceptedFiles[0]),
        })
      }
    },
    [setImage],
  )

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejections) => fileRejections.errors[0].code === 'too-many-files',
      )

      const fileTooLarge = fileRejections.find(
        (fileRejections) => fileRejections.errors[0].code === 'file-too-large',
      )

      const fileInvalidType = fileRejections.find(
        (fileRejections) =>
          fileRejections.errors[0].code === 'file-invalid-type',
      )

      if (tooManyFiles) {
        toast.error('You can only upload one image')
      }

      if (fileTooLarge) {
        toast.error('Maximum file size is 5MB')
      }

      if (fileInvalidType) {
        toast.error('Invalid file format. Only images are valid.')
      }
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5,
    accept: {
      'image/*': [],
    },
  })

  return (
    <div className="h-50">
      <div
        {...getRootProps()}
        className={cn(
          'justify-center shadow mt-2 flex flex-col border-gray-400 px-5 py-10 text-center items-center gap-4 relative border border-dashed transition-colors duration-200 ease-in-out hover:cursor-pointer',
          image ? 'h-35' : 'h-50',
        )}
      >
        <input {...getInputProps()} />
        <UploadIcon size={24} />
        <div className="">
          <p className="text-sm select-none mb-2 font-medium">
            Drag & drop or{' '}
            <span className="text-primary hover:underline hover:underline-offset-1">
              choose files
            </span>{' '}
            to upload
          </p>
          <p className="text-xs text-muted-foreground select-none mb-1">
            Supported formats: .jpg, .png, .webp
          </p>
          <p className="text-xs text-muted-foreground select-none">
            Max Upload - 5MB
          </p>
        </div>
      </div>
      {image ? (
        <div className="flex justify-between bg-accent border py-2 px-3 mt-4 items-center">
          <p className="text-sm">{image.file.name}</p>
          <Button onClick={() => setImage(null)} asChild>
            <div className="bg-red-800 hover:bg-red-800 p-1 w-7 h-7 flex items-center justify-center hover:cursor-pointer">
              <Trash2Icon size={18} color="white" />
            </div>
          </Button>
        </div>
      ) : null}
    </div>
  )
}
