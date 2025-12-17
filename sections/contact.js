import open from 'open';

export async function showContact(typeWriter) {
  await typeWriter("\n📧 Email: jailavaniya010@gmail.com");
  await typeWriter("☎️ Phone: +91-9694281328");
  await typeWriter("💼 LinkedIn: @jaiparashar - Type 'linkedin' to open");
  await typeWriter("🌐 Resume: Type 'resume' to open");
  await typeWriter("🐦 GitHub: @itsojaylicious - Type 'github' to open");
}
