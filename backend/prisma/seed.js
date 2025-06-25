const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fetch first user to use as uploaderId
  const uploader = await prisma.user.findFirst();

  if (!uploader) {
    console.error("❌ No user found. Please create a user before running the seed.");
    return;
  }

  // Insert sample resources
  await prisma.resource.createMany({
    data: [
      {
        title: 'Data Structures Notes',
        description: 'Comprehensive notes on stacks, queues, and trees.',
        categoryId: 'cs',
        category: 'Computer Science',
        fileType: 'pdf',
        fileSize: '1.2 MB',
        fileUrl: 'https://example.com/resources/data-structures.pdf',
        uploaderId: uploader.id,
        approved: true,
      },
      {
        title: 'Operating Systems Summary',
        description: 'Summarized concepts of OS including scheduling, memory, and file systems.',
        categoryId: 'cs',
        category: 'Computer Science',
        fileType: 'pdf',
        fileSize: '2.4 MB',
        fileUrl: 'https://example.com/resources/os-summary.pdf',
        uploaderId: uploader.id,
        approved: false,
      },
      {
        title: 'DBMS Concepts',
        description: 'Notes on ER model, relational model, normalization, and SQL queries.',
        categoryId: 'cs',
        category: 'Computer Science',
        fileType: 'pdf',
        fileSize: '3.1 MB',
        fileUrl: 'https://example.com/resources/dbms-notes.pdf',
        uploaderId: uploader.id,
        approved: true,
      }
    ]
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
