import jsPDF from 'jspdf'

export function downloadResumePdf(profile, skills, experiences, projects, language = 'en') {
  const labels =
    language === 'zh'
      ? {
          workExperience: 'Work Experience',
          coreSkills: 'Core Skills',
          selectedProjects: 'Selected Projects',
        }
      : {
          workExperience: 'Work Experience',
          coreSkills: 'Core Skills',
          selectedProjects: 'Selected Projects',
        }
  const doc = new jsPDF()
  const margin = 18
  let y = 20

  const writeLine = (text, spacing = 7) => {
    doc.text(text, margin, y)
    y += spacing
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  writeLine(profile.name, 10)

  doc.setFontSize(13)
  doc.setFont('helvetica', 'normal')
  writeLine(`${profile.title} | ${profile.location}`)
  writeLine(profile.email, 12)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  writeLine(labels.workExperience, 8)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  experiences.forEach((item) => {
    writeLine(`${item.period}  ${item.role} @ ${item.company}`, 6)
    const wrapped = doc.splitTextToSize(item.details, 172)
    doc.text(wrapped, margin, y)
    y += wrapped.length * 5 + 3
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  writeLine(labels.coreSkills, 8)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  writeLine(skills.map((skill) => `${skill.name} (${skill.level}%)`).join(' | '), 10)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  writeLine(labels.selectedProjects, 8)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  projects.slice(0, 3).forEach((project) => {
    writeLine(`${project.title} - ${project.summary}`, 6)
  })

  doc.save(`${profile.name.replace(/\s+/g, '-')}-Resume.pdf`)
}
