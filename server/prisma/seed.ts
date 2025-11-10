import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      {
        bookTitle: "The Pragmatic Programmer",
        bookPrice: 39.99,
        bookDescrpition: "Classic guide to better software craftsmanship.",
        bookImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        bookStock: 10,
      },
      {
        bookTitle: "Clean Code",
        bookPrice: 34.99,
        bookDescrpition: "Guide to writing clean, maintainable code.",
        bookImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
        bookStock: 15,
      },
      {
        bookTitle: "Refactoring",
        bookPrice: 44.99,
        bookDescrpition: "Techniques for improving existing codebases.",
        bookImage: "https://images.unsplash.com/photo-1526318472351-bc6fa9e3f0c3",
        bookStock: 12,
      },
    ],
  });
}

main()
  .then(() => console.log("Seeded successfully"))
  .catch((err) => console.error(err))
  .finally(() => prisma.$disconnect());
