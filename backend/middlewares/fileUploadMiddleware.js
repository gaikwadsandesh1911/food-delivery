import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        // console.log('file', file)
        if(file.mimetype.startsWith('image/')){
            return cb(null, `${Date.now()}-${file.originalname}`);
        }
        else{
            cb(new Error("Only image file is allowed"));
        }
    }
});

export const upload = multer({storage: storage});