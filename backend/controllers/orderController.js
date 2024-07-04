import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"

// placing user order for frontend 

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed " })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

//user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}
//listing of order to admin panel

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// api for order status

const updateStatus = async (req,res) => {
try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
    res.json({success:true , message:"status updated"})

} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

export { placeOrder, userOrders, listOrders , updateStatus }