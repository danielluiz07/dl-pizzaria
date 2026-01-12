import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService";

class DeleteOrderController{
    async handle(req: Request, res: Response){
        const {order_id} = req.body
        
        const DeleteOrder = new DeleteOrderService()
        const updateOrder = await DeleteOrder.execute({order_id: order_id})
        
        res.json(updateOrder)
    }
}

export { DeleteOrderController }