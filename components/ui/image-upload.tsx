import { ImagePlus, Trash } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary"

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value,
}: ImageUploadProps) => {
    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    return (
        <div>
            <div className="mb-4">
                {value.map((url) => (
                    <div 
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden "
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash className="h-4 w-4"/>
                            </Button>
                        </div>
                        <Image 
                            fill
                            className="object-cover"
                            src={url}
                            alt="Image"
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget
                uploadPreset="qmdatv83"
                onUpload={onUpload}
            >
                {({open}) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <Button 
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2"/>
                            Upload an image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;