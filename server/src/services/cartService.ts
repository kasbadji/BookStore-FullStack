import prisma from "../config/db"

export class cartService {

    //! get cart item
    static async getCartByUserId(userId: string){
        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { book: true }}},
        });
        if (!cart){
            cart = await prisma.cart.create({
                data: { userId },
                include: { items: { include: { book: true }}},
            });
        }
        return cart;
    }

    //! add Item
    static async addItem(userId: string, bookId: string, quantity: number){
        const cart = await this.getCartByUserId(userId);
    const existingItem = cart.items.find((i: any) => i.bookId === bookId);

        if (existingItem){
            return prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }

        const book = await prisma.book.findUnique({
            where: {bookId}
        });
        if (!book) throw new Error("Book not found");

        return prisma.cartItem.create({
            data: {
                cartId: cart.id,
                bookId,
                quantity,
                price: book.bookPrice,
            },
        });
    }

    //! remove Item
    static async removeItem(itemId: string){
        return prisma.cartItem.delete({ where: { id: itemId } });
    }

    static async clearCart(userId: string){
        const cart = await prisma.cart.findUnique({ where: { userId }});
        if (!cart) return;
        await prisma.cartItem.deleteMany({ where: { cartId: cart.id }});
    }
}



//! getCartByUserId
/*
{
  "id": "cart_1",
  "userId": "user_1",
  "status": "active",
  "item": [
    {
      "id": "item_1",
      "cartId": "cart_1",
      "bookId": "book_1",
      "quantity": 1,
      "price": "29.99",
      "book": {
        "bookId": "book_1",
        "bookTitle": "Clean Code",
        "bookPrice": "29.99",
        "bookDescrpition": "...",
        "bookImage": "...",
        "bookStock": 10
      }
    }
  ]
}
*/
