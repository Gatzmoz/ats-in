import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { ResumeData } from "@/lib/type";

// Format helper for bullet point parsing
const parseBullets = (text: string): string[] => {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim().replace(/^[-•*]\s*/, ""))
    .filter((line) => line.length > 0);
};

// Format dates (e.g. 2023-01 -> Jan 2023 or Present)
const formatDate = (dateStr: string, isCurrent: boolean = false): string => {
  if (isCurrent) return "Present";
  if (!dateStr) return "";
  try {
    const [year, month] = dateStr.split("-");
    if (!year) return dateStr;
    if (!month) return year;
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

interface PDFTemplateProps {
  data: ResumeData;
}

export const PDFDocument: React.FC<PDFTemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    projects,
    skills,
    certifications,
    config,
  } = data;

  const fontFamily = config?.fontFamily || "Helvetica";
  const accentColor = config?.accentColor || "#1e3a8a";
  const fontSizeMode = config?.fontSize || "medium";
  const templateId = config?.templateId || "classic";

  const fontSizes = {
    small: { name: 17, sectionTitle: 10.5, body: 9, subtitle: 9.5, meta: 8 },
    medium: { name: 19, sectionTitle: 11.5, body: 9.5, subtitle: 10, meta: 8.5 },
    large: { name: 21, sectionTitle: 12.5, body: 10, subtitle: 10.5, meta: 9 },
  }[fontSizeMode];

  const styles = StyleSheet.create({
    page: {
      paddingTop: 32,
      paddingBottom: 32,
      paddingLeft: 36,
      paddingRight: 36,
      fontFamily: fontFamily,
      fontSize: fontSizes.body,
      lineHeight: config?.lineSpacing || 1.25,
      color: "#111827",
    },
    // Header Styles
    header: {
      marginBottom: 8,
      textAlign: templateId === "executive" ? "center" : "left",
    },
    name: {
      fontSize: fontSizes.name,
      fontFamily: fontFamily,
      fontWeight: "bold",
      color: templateId === "executive" ? accentColor : "#111827",
      lineHeight: 1.15,
      marginBottom: 2,
      textTransform: "uppercase",
    },
    title: {
      fontSize: fontSizes.subtitle,
      color: accentColor,
      fontWeight: "bold",
      lineHeight: 1.15,
      marginBottom: 3,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: templateId === "executive" ? "center" : "flex-start",
      alignItems: "center",
      fontSize: fontSizes.meta,
      color: "#4b5563",
      lineHeight: 1.2,
      marginTop: 1,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    contactLink: {
      color: "#1d4ed8",
      textDecoration: "none",
    },
    dividerDot: {
      marginHorizontal: 2.5,
      color: "#9ca3af",
      fontSize: fontSizes.meta,
    },

    // Section Styles
    section: {
      marginBottom: 8,
    },
    sectionHeader: {
      marginTop: 2,
      marginBottom: 4,
      borderBottomWidth: templateId === "minimal" ? 0 : 1,
      borderBottomColor: accentColor,
      borderBottomStyle: "solid",
      paddingBottom: 2,
    },
    sectionTitle: {
      fontSize: fontSizes.sectionTitle,
      fontFamily: fontFamily,
      fontWeight: "bold",
      color: accentColor,
      lineHeight: 1.2,
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },

    // Summary
    summaryText: {
      fontSize: fontSizes.body,
      color: "#374151",
      lineHeight: 1.25,
      textAlign: "justify",
    },

    // Item Entries
    entry: {
      marginBottom: 6,
    },
    entryHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 1,
    },
    entryTitle: {
      fontSize: fontSizes.subtitle,
      fontFamily: fontFamily,
      fontWeight: "bold",
      color: "#111827",
      lineHeight: 1.15,
    },
    entrySubtitle: {
      fontSize: fontSizes.body,
      fontFamily: fontFamily,
      color: "#374151",
      fontStyle: "italic",
      lineHeight: 1.15,
    },
    entryDate: {
      fontSize: fontSizes.meta,
      color: "#4b5563",
      textAlign: "right",
      lineHeight: 1.15,
    },

    // Bullet List
    bulletList: {
      marginTop: 2,
      paddingLeft: 4,
    },
    bulletItem: {
      flexDirection: "row",
      marginBottom: 1.5,
    },
    bulletPoint: {
      width: 9,
      fontSize: fontSizes.body,
      color: "#374151",
      lineHeight: 1.25,
    },
    bulletContent: {
      flex: 1,
      fontSize: fontSizes.body,
      color: "#374151",
      lineHeight: 1.25,
    },

    // Skills
    skillRow: {
      flexDirection: "row",
      marginBottom: 2.5,
    },
    skillCategoryName: {
      fontSize: fontSizes.body,
      fontWeight: "bold",
      color: "#111827",
      width: 145,
      lineHeight: 1.25,
    },
    skillListText: {
      flex: 1,
      fontSize: fontSizes.body,
      color: "#374151",
      lineHeight: 1.25,
    },
  });

  const renderContactInfo = () => {
    const items: React.ReactNode[] = [];

    if (personalInfo.email) {
      items.push(<Text key="email">{personalInfo.email}</Text>);
    }
    if (personalInfo.phone) {
      items.push(<Text key="phone">{personalInfo.phone}</Text>);
    }
    if (personalInfo.location) {
      items.push(<Text key="loc">{personalInfo.location}</Text>);
    }
    if (personalInfo.linkedin) {
      items.push(
        <Link key="linkedin" src={personalInfo.linkedin} style={styles.contactLink}>
          LinkedIn
        </Link>
      );
    }
    if (personalInfo.github) {
      items.push(
        <Link key="github" src={personalInfo.github} style={styles.contactLink}>
          GitHub
        </Link>
      );
    }
    if (personalInfo.website) {
      items.push(
        <Link key="web" src={personalInfo.website} style={styles.contactLink}>
          Portfolio
        </Link>
      );
    }

    return (
      <View style={styles.contactRow}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.contactItem}>{item}</View>
            {index < items.length - 1 && <Text style={styles.dividerDot}>•</Text>}
          </React.Fragment>
        ))}
      </View>
    );
  };

  return (
    <Document title={`${personalInfo.fullName || "Resume"} - ATS CV`}>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || "Your Full Name"}</Text>
          {personalInfo.jobTitle && (
            <Text style={styles.title}>{personalInfo.jobTitle}</Text>
          )}
          {renderContactInfo()}
        </View>

        {/* SUMMARY */}
        {summary && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* WORK EXPERIENCE */}
        {workExperience && workExperience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
            </View>
            {workExperience.map((exp) => (
              <View key={exp.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.entryTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.entrySubtitle}>
                      {exp.company}
                      {exp.location ? ` | ${exp.location}` : ""}
                    </Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate, exp.isCurrent)}
                  </Text>
                </View>
                {exp.description && (
                  <View style={styles.bulletList}>
                    {parseBullets(exp.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletContent}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {education.map((edu) => (
              <View key={edu.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.entryTitle}>
                      {edu.degree}
                      {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                    </Text>
                    <Text style={styles.entrySubtitle}>
                      {edu.school}
                      {edu.location ? ` | ${edu.location}` : ""}
                      {edu.gpa ? ` (GPA: ${edu.gpa})` : ""}
                    </Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate, edu.isCurrent)}
                  </Text>
                </View>
                {edu.description && (
                  <Text style={[styles.summaryText, { marginTop: 2 }]}>
                    {edu.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Skills</Text>
            </View>
            {skills.map((skill) => (
              <View key={skill.id} style={styles.skillRow}>
                <Text style={styles.skillCategoryName}>
                  {skill.categoryName}:
                </Text>
                <Text style={styles.skillListText}>{skill.skillsList}</Text>
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Projects</Text>
            </View>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.entryTitle}>
                      {proj.title}
                      {proj.role ? ` (${proj.role})` : ""}
                    </Text>
                    {proj.techStack && (
                      <Text style={styles.entrySubtitle}>
                        Technologies: {proj.techStack}
                      </Text>
                    )}
                  </View>
                  {(proj.startDate || proj.endDate) && (
                    <Text style={styles.entryDate}>
                      {formatDate(proj.startDate || "")}{" "}
                      {proj.endDate ? `- ${formatDate(proj.endDate)}` : ""}
                    </Text>
                  )}
                </View>
                {proj.description && (
                  <View style={styles.bulletList}>
                    {parseBullets(proj.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletContent}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS */}
        {certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Certifications & Licenses</Text>
            </View>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.entryTitle}>{cert.name}</Text>
                    <Text style={styles.entrySubtitle}>{cert.issuer}</Text>
                  </View>
                  {cert.issueDate && (
                    <Text style={styles.entryDate}>
                      Issued: {formatDate(cert.issueDate)}
                      {cert.expirationDate ? ` (Exp: ${formatDate(cert.expirationDate)})` : ""}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
