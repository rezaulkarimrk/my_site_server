const Message = require('../models/message.model.schema');

exports.getAllMessage = async (req, res) => {

    try {
    const message = await Message.find()

    res.status(200).json({
        success: true,
        status: 200,
        message: 'All Message',
        data: message,
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Internal Server Error',
            data: error,
        });
    }
    
}

exports.getSinglseMessage = async (req, res) => {
    
    try {
        const message = await Message.findOne({_id: req.params.id});

        res.status(202).json({
            success: true,
            status: 202,
            message: `Message for ${message.name}`,
            data: message,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Internal Server Error',
            data: error,
        });
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.deleteOne({_id: req.params.id});

        res.status(202).json({
            success: true,
            status: 202,
            message: `Message deleted successfully`,
            data: message,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Internal Server Error',
            data: error,
        });
    }
}

exports.saveMessage = async (req, res) => {
    try {

        const message = await Message.findOne({ip: req.body.ip});
        if(message){
            
            const DBdate = message.date.toJSON().slice(0, 10);
            const presentDate = new Date().toJSON().slice(0, 10);

            if(( DBdate === presentDate ) && ( message.mailCount>=3 )){
                return res.status(423).json({
                    success: false,
                    status: 423,
                    message: 'You already try 3 times',
                    data: {},
                });
            }
            else if(( DBdate === presentDate ) && ( message.mailCount<=2 )) {
                message.name = req.body.name;
                message.email = req.body.email;
                message.phone = req.body.phone;
                message.subject = req.body.subject;
                message.message = req.body.message;
                message.mailCount = message.mailCount+1;

                return await message.save()
                        .then((data) => {
                            res.status(202).json({
                                success: true,
                                status: 202,
                                message: 'Your Message is Updateed successfully',
                                data: data,
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({
                                success: false,
                                status: 500,
                                message: 'Your Message is not send again',
                                data: error,
                            });
                        })
            }
            else if ( DBdate !== presentDate ){

                message.name = req.body.name;
                message.email = req.body.email;
                message.phone = req.body.phone;
                message.subject = req.body.subject;
                message.message = req.body.message;
                message.mailCount = 0;
                message.date = new Date();

                return await message.save()
                        .then((data) => {
                            res.status(202).json({
                                success: true,
                                status: 202,
                                message: 'Your Message is Updateed successfully',
                                data: data,
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({
                                success: false,
                                status: 500,
                                message: 'Your Message is not send again',
                                data: data,
                            });
                        })
            }
        }

        const newMessage = new Message(req.body)
        await newMessage.save()
            .then((message) => {
                res.status(201).json({
                    success: true,
                    status: 201,
                    message: 'Your Message send successfully',
                    data: message,
                  });
            })
            .catch((error) => {
                res.status(500).json({
                    success: false,
                    status: 500,
                    message: 'Sorry Your Message Not send',
                    data: error,
                  });
            });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Internal Server Error',
            data: error,
          });
    }
    
}