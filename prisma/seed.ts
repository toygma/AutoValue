// import { Fuel, Transmission } from "@/lib/generated/prisma/enums";
// import prisma from "@/lib/prisma";
// import bcrypt from "bcrypt";

// async function main() {
//   const usersData = [
//     { name: "Alice", email: "alice@prisma.io", password: "securepassword123" },
//     { name: "Bob", email: "bob@prisma.io", password: "securepassword123" },
//   ];

//   const users = [];
//   for (const u of usersData) {
//     const hashedPassword = await bcrypt.hash(u.password, 10);
//     const user = await prisma.user.create({
//       data: { ...u, password: hashedPassword },
//     });
//     users.push(user);
//   }

//   // 2️⃣ Cars
//   const carsData = [
//     {
//       brand: "Toyota",
//       model: "Corolla",
//       year: 2021,
//       fuel: Fuel.Gaz,
//       transmission: Transmission.Otomatik,
//       km: 15000,
//       color: "White",
//       engineSize: "1.8L",
//       horsePower: 140,
//       price: 25000,
//       city: "Istanbul",
//       district: "Kadikoy",
//       title: "Temiz Toyota Corolla",
//       description: "Hiçbir problemi yok, full bakımlı.",
//       user: { connect: { id: users[0].id} },
//     },
//     {
//       brand: "BMW",
//       model: "X5",
//       year: 2022,
//       fuel: Fuel.Gaz,
//       transmission: Transmission.Otomatik,
//       km: 20000,
//       color: "Black",
//       engineSize: "3.0L",
//       horsePower: 250,
//       price: 65000,
//       city: "Ankara",
//       district: "Cankaya",
//       title: "BMW X5 M Sport",
//       description: "Harika durumda, tüm bakımları yapıldı.",
//       user: { connect: { id: users[1].id} },
//     },
//   ];

//   for (const car of carsData) {
//     await prisma.car.create({ data: car });
//   }

//   console.log("Seed completed!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
