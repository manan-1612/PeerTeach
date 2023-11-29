const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const app = express()
const multer = require('multer');
const UserModel = require('./models/users')
const Video = require('./models/video');
const fs = require('fs');
const path = require('path');

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/peerteach");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Rename the file
    },
});

const upload = multer({ storage: storage });

app.post('/VideoUpload', upload.single('video'), async (req, res) => {
    try {
        // Create a new Video document with the uploaded data
        const video = new Video({
            title: req.body.title,
            college: req.body.college,
            course: req.body.course,
            branch: req.body.branch,
            semester: req.body.semester,
            subject: req.body.subject,
            email: req.body.email,
            name: req.body.name,
            batch: req.body.batch,
            otherDetails: req.body.otherDetails,
            videoPath: req.file.path, // Store the file path in the database
            notes: req.body.notes,
        });

        // Save the video document to the database
        await video.save();

        res.status(201).json({ message: 'Video uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading video' });
    }
});

app.post('/VideoFilter', async (req, res) => {
    try {
        const filter = {};

        // Define an array to hold filter conditions
        const filterConditions = [];

        if (req.body.title != null && req.body.title !== '') {
            filterConditions.push({ title: { $regex: new RegExp(req.body.title, 'i') } });
        }
        if (req.body.college != null && req.body.college !== '') {
            filterConditions.push({ college: { $regex: new RegExp(req.body.college, 'i') } });
        }
        if (req.body.course != null && req.body.course !== '') {
            filterConditions.push({ course: { $regex: new RegExp(req.body.course, 'i') } });
        }
        if (req.body.branch != null && req.body.branch !== '') {
            filterConditions.push({ branch: { $regex: new RegExp(req.body.branch, 'i') } });
        }
        if (req.body.semester != null && req.body.semester !== '') {
            filterConditions.push({ semester: req.body.semester });
        }
        if (req.body.subject != null && req.body.subject !== '') {
            filterConditions.push({ subject: { $regex: new RegExp(req.body.subject, 'i') } });
        }
        if (req.body.name != null && req.body.name !== '') {
            filterConditions.push({ name: { $regex: new RegExp(req.body.name, 'i') } });
        }
        if (req.body.email != null && req.body.email !== '') {
            filterConditions.push({ email: { $regex: new RegExp(req.body.email, 'i') } });
        }
        if (req.body.batch != null && req.body.batch !== '') {
            filterConditions.push({ batch: req.body.batch });
        }
        // Check if there are any filter conditions before using $and
        if (filterConditions.length > 0) {
            filter.$and = filterConditions;
        }

        console.log("printing filter");
        console.log(filter);
        console.log("printing req.body");
        console.log(req.body);

        // Use the filter to find matching videos
        const videos = await Video.find(filter, '_id title college course branch semester subject otherDetails videoPath name email likec dislikec liked disliked batch notes')
            .sort({ _id: -1 });

        console.log("Result");
        console.log(videos);
        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error filtering videos' });
    }
});




app.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find({}, '_id title college course branch semester subject otherDetails videoPath name email notes likec dislikec liked disliked batch').sort({ _id: -1 });
        res.json(videos);
        console.log(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching videos' });
    }
});

app.post('/likefind/:email', async (req, res) => {
    const userEmail = req.params.email;
    console.log("i am don");
    try {

        const videos = await Video.find({}, '_id title college course branch semester subject otherDetails videoPath name email notes likec dislikec liked disliked').sort({ _id: -1 });

        const likedVideos = videos.filter(video => video.liked.includes(userEmail));
        console.log("don video liked");
        console.log(likedVideos);
        // Send the filtered videos as a response
        res.json(likedVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching videos' });
    }
});

app.post('/dislikefind/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        // Filter videos where the 'disliked' array contains the user's email
        const videos = await Video.find({}, '_id title college course branch semester subject otherDetails videoPath name email notes likec dislikec liked disliked').sort({ _id: -1 });
        const dislikedVideos = videos.filter(video => video.disliked.includes(userEmail));

        // Send the filtered videos as a response
        res.json(dislikedVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching videos' });
    }
});

app.get('/videos/:id', async (req, res) => {

    const videoId = req.params.id;
    console.log(videoId);
    // Fetch video information from the database based on the videoId
    const video = await Video.findById(videoId);
    console.log(video.title);
    if (!video) {
        return res.status(404).send('Video not found');
    }
    //const temp = toString(video.videoPath);
    // Construct the video file path
    //const videoPath = path.join(__dirname, 'uploads', video.videoPath);
    const videoPath1 = video.videoPath;
    // Check if the video file exists
    if (fs.existsSync(videoPath1)) {

        const stat = fs.statSync(videoPath1);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath1, { start, end });

            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, head);
            file.pipe(res);
            console.log("Hello1");
        } else {
            // If no range header is provided, send the entire video
            console.log("Hello2");
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(200, head);
            fs.createReadStream(videoPath1).pipe(res);
        }
    } else {
        // Video file not found
        res.status(404).send('Video not found');
    }
});

app.get('/generate-thumbnail/:videoId', async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const videoPath = 'path_to_your_video_directory/' + videoId + '.mp4'; // Adjust the video path

        // Generate a thumbnail image
        const thumbnailPath = 'path_to_your_thumbnail_directory/' + videoId + '.png'; // Adjust the thumbnail path
        await ffmpeg(videoPath)
            .screenshots({
                count: 1,
                folder: thumbnailPath,
                filename: 'thumbnail.png',
                size: '640x360', // Adjust the thumbnail size
            });

        // Send the generated thumbnail path as the response
        res.json({ thumbnailPath });
    } catch (error) {
        console.error('Error generating thumbnail:', error);
        res.status(500).json({ message: 'Error generating thumbnail' });
    }
});

app.post('/register', (req, res) => {
    // Check if the email already exists in the database
   
    var c = 0;
    UserModel.findOne({ email: req.body.email })
        .then(users => {
            if (users) {
                c = 1;
                // If the email already exists, send a response indicating it's a duplicate
                res.json({ c });
            } else {
                c = 0;
                // If the email doesn't exist, create a new user and save it to the database
                UserModel.create(req.body)
                    .then(users => res.json({ users, c }))
                    .catch(err => res.json(err))
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occurred while checking for duplicate emails.' });
        });
});

app.post('/login', (req, res) => {
    console.log("Hello");
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then(
        async user => {
            if (user) {
                if (user.password === password) {

                    // Define an array to hold filter conditions
                    res.json({ mes: "Success", userData: user });
                }
                else {
                    res.json("Password is incorrect");
                }
            }
            else {
                res.json("User not existed");
            }
        }
    )
})

app.post('/UpdateDetails', async (req, res) => {
    const formData = req.body.formData;
    const userData = req.body.userData;
    console.log(formData);
    console.log(userData);

    const updatedUser = await UserModel.findByIdAndUpdate(userData._id, formData, { new: true });

    res.json(formData);
})

app.post('/seeVideos', async (req, res) => {
    const { name, email } = req.body;
    const filter = {};
    const filterConditions = [];
    // filterConditions.push({ name: name });
    filterConditions.push({ email: email });
    filter.$and = filterConditions;
    const videos = await Video.find(filter, '_id title college course branch semester subject otherDetails videoPath name email notes likec dislikec liked disliked')
        .sort({ _id: -1 });
    
    console.log(filter);
    console.log(videos);
    res.json(videos);

})

app.post('/deleteVideos', async (req, res) => {
    console.log("Hello i am manan");
    const { id, email } = req.body;
    console.log(email);
    const removedItem = await Video.findByIdAndRemove(id);
    const filter = {};
    const filterConditions = [];
    filterConditions.push({ email: email });
    filter.$and = filterConditions;
    const videos = await Video.find(filter, '_id title college course branch semester subject otherDetails videoPath name email')
        .sort({ _id: -1 });
    console.log(videos);
    res.json(videos);
})



app.post('/like/:videoId/:email', async (req, res) => {
    const videoId = req.params.videoId;
    const userEmail = req.params.email;
    console.log(userEmail);
    try {
        const video = await Video.findById(videoId);
        console.log("here in like");
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        if (video.disliked.includes(userEmail)) {
            video.disliked = video.disliked.filter(email => email !== userEmail);
        }
        if (video.liked.includes(userEmail)) {
            video.liked = video.liked.filter(email => email !== userEmail);
        }
        else if (!video.liked.includes(userEmail)) {
            console.log("pushing into liked");
            video.liked.push(userEmail);
            console.log(video.liked);
        }
        await video.save();
        video.likec = video.liked.length;
        video.dislikec = video.disliked.length;
        await video.save();

        return res.json({ video });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to like the video' });
    }
});

app.post('/dislike/:videoId/:email', async (req, res) => {
    const videoId = req.params.videoId;
    const userEmail = req.params.email;

    try {
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        if (video.liked.includes(userEmail)) {
            video.liked = video.liked.filter(email => email !== userEmail);
        }

        if (video.disliked.includes(userEmail)) {
            video.disliked = video.disliked.filter(email => email !== userEmail);
        }

        else if (!video.disliked.includes(userEmail)) {
            video.disliked.push(userEmail);
        }

        await video.save();
        video.likec = video.liked.length;
        video.dislikec = video.disliked.length;
        await video.save();

        return res.json({ video });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to like the video' });
    }
});



app.listen(3001, () => {
    console.log("server is running")
})


/*
<button
                        onClick={handleSubmit}
                        type="button"
                        style={{
                            background: 'linear-gradient(to bottom right, #ff4d4d, #007bff)',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            marginTop: '8%',
                            cursor: 'pointer',
                            position: 'fixed',
                            marginLeft: '50px',
                        }}
                    >
                        Add Video
                    </button>
*/