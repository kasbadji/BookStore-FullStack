import prisma from "../config/db";

export class serviceBook{
    static async getAllBook(){
        return await prisma.book.findMany();
    };

    static async getBookById(bookId: string){
        return prisma.book.findUnique({
            where: {bookId}
        });
    }

    static async createBook(data:{
        bookTitle: string;
        bookPrice: number;
        bookDescrpition: string;
        bookImage: string;
        bookStock: number;
    }) {
        return prisma.book.create({ data });
    }

    static async updateBook(bookId: string, data: Partial<{
        bookTitle: string;
        bookPrice: number;
        bookDescrpition: string;
        bookImage: string;
        bookStock: number;
    }>) {
        return prisma.book.update({
            where: { bookId },
            data,
        });
    }

    static async deleteBook(bookId: string){
        return prisma.book.delete({
            where: { bookId }
        });
    }
}
