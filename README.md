# 🧠 Spot the AI – Real vs AI Image Classifier 

**Spot the AI** is a web-based image classification tool that helps users identify whether an image is **AI-generated** or a **real photograph**. It uses cutting-edge deep learning models to analyze visual patterns and predict authenticity — perfect for digital art reviewers, researchers, and curious minds.

---

## 🎯 Features

- 📤 Drag & drop or upload any image
- ⚡ Fast prediction using Hugging Face Inference API
- 🧠 AI vs Real label with **confidence score**
- 💬 Clear visual explanation & disclaimer
- ✨ Built with React, TypeScript & TailwindCSS

---

## 📸 Preview

![Screenshot 2025-06-27 123108](https://github.com/user-attachments/assets/ffbf65a0-0984-4bb4-afb8-3a2a245b1d4f)


---

## 🛠️ Tech Stack

| Tech              | Purpose                           |
|------------------|-----------------------------------|
| **React + Vite** | Frontend framework                |
| **TypeScript**   | Type-safe logic                   |
| **Tailwind CSS** | Modern UI styling                 |
| **Hugging Face** | ML model inference API            |
| **Vercel**       | Hosting and deployment platform   |

---

## 🧪 Model in Use

Currently using:  
🔗 [`umm-maybe/AI-image-detector`](https://huggingface.co/umm-maybe/AI-image-detector)

- Binary classifier that predicts if an image is **AI-generated** or **real**
- Powered by Hugging Face Inference API
- Will be replaced by a **custom-trained model** for improved accuracy soon!

---
🚀Hosted in netlify : [Live Demo](https://whimsical-hotteok-08d84d.netlify.app) 

## 🚀 Running Locally

```bash
# Clone the repo
git clone https://github.com/your-username/spot-the-ai.git
cd spot-the-ai

# Install dependencies
npm install

# Run the dev server
npm run dev
```
