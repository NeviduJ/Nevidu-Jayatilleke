# Personal Researcher Website

A modern, dynamic personal website for showcasing research publications, professional experience, and open-source projects. Built with Next.js and deployed on GitHub Pages.

**Live Site:** [https://NeviduJ.github.io/Nevidu-Jayatilleke/](https://NeviduJ.github.io/Nevidu-Jayatilleke/)

## ✨ Features

### 🔄 Dynamic Content Updates
- **Publications**: Automatically fetches and updates publication data from Google Scholar daily
- **Projects**: Displays top GitHub repositories with live stats (stars, forks, languages)
- **Sorted by Impact**: Publications are ordered by citation count to highlight most impactful work

### 📱 Responsive Design
- Fully responsive layout that adapts to desktop, tablet, and mobile devices
- Modern, clean UI with dark mode support
- Professional typography and smooth animations using Framer Motion

### 🤖 Automated Workflows
- Daily GitHub Actions workflow updates publication data from Google Scholar
- Automatic deployment to GitHub Pages on every push
- Repository dispatch triggers ensure publications and site stay in sync

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with React
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript
- **Data Fetching**: 
  - Python script with `scholarly` library for Google Scholar
  - GitHub API for repository data
- **Deployment**: GitHub Pages (static export)

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn
- Python 3.x (for running the Scholar data script locally)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/NeviduJ/Nevidu-Jayatilleke.git
   cd Nevidu-Jayatilleke
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Building for Production

```bash
npm run build
```

The static site will be generated in the `out/` directory.

## 📊 Updating Publication Data

### Manually
```bash
# Set up Python virtual environment (first time only)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r scripts/requirements.txt

# Run the script
python scripts/fetch_scholar.py
```

### Automatically
The GitHub Actions workflow (`.github/workflows/update_scholar.yml`) runs daily at midnight UTC to:
1. Fetch latest publications from Google Scholar
2. Update `data/publications.json`
3. Commit changes
4. Trigger a new deployment

## 🔧 Configuration

### Changing Repository Details
If you fork this project, update the following:

1. **Repository base path** in `src/app/page.tsx`:
   ```typescript
   const basePath = typeof window === 'undefined' && process.env.NODE_ENV === 'production' 
     ? '/YOUR-REPO-NAME'  // Change this
     : '';
   ```

2. **Google Scholar ID** in `scripts/fetch_scholar.py`:
   ```python
   AUTHOR_ID = 'YOUR_SCHOLAR_ID'  # Change this
   ```

3. **GitHub username** in `src/lib/github.ts`:
   ```typescript
   const response = await fetch('https://api.github.com/users/YOUR_USERNAME/repos')
   ```

## 📁 Project Structure

```
├── .github/workflows/      # GitHub Actions workflows
│   ├── deploy.yml         # Deployment workflow
│   └── update_scholar.yml # Publication update workflow
├── data/                  # JSON data files
│   └── publications.json  # Google Scholar publications
├── public/                # Static assets
│   └── profile.jpg       # Profile picture
├── scripts/               # Automation scripts
│   ├── fetch_scholar.py  # Scholar data fetcher
│   └── requirements.txt  # Python dependencies
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx     # Homepage
│   │   ├── resume/      # Professional background page
│   │   └── layout.tsx   # Root layout
│   ├── data/            # TypeScript data
│   │   └── resume.ts    # Experience and education data
│   └── lib/             # Utility functions
│       └── github.ts    # GitHub API integration
└── next.config.ts        # Next.js configuration
```

## 🎨 Customization

### Updating Content

- **About Section**: Edit the text in `src/app/page.tsx`
- **Experience/Education**: Update `src/data/resume.ts`
- **Contact Information**: Modify social links in `src/app/page.tsx`
- **Profile Picture**: Replace `public/profile.jpg` with your image

### Styling

All styling uses Tailwind CSS utility classes. Global styles are in `src/app/globals.css`.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Publication data from [Google Scholar](https://scholar.google.com/)
- Icons from [Lucide](https://lucide.dev/)
