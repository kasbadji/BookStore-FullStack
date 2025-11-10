import prisma from "../config/db";

export class orderService {
    static async checkout(userId: string) {
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        });
        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        const totalPrice = cart.items.reduce((sum: number, item: any) =>
             sum + Number(item.price) * item.quantity, 0);

        const order = await prisma.order.create({
            data: {
                userId,
                totalPrice,
                status: "pending",
                items: {
                    create: cart.items.map((item: any) => ({
                        bookId: item.bookId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: { items: true },
        });

        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

        return order;
    }

    static async getOrdersByUserId(userId: string) {
    return prisma.order.findMany({
        where: { userId },
        include: {
        items: {
            include: { book: true },
        },
        },
        orderBy: { id: "desc" }, //! Order by most recent first
     });
    }

}
