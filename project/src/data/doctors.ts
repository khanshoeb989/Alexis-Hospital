import drGanesh from "../assets/ganesh.jpg";

export interface Doctor {
  slug: string;
  name: string;
  title: string;
  experience: string;
  image: string;
  qualifications: string[];
  description: string[];
  expertise: string[];
  experienceDetails: string[];
  memberships: string[];
}

export const doctors: Doctor[] = [
  {
    slug: "dr-ganesh-ahire",
    name: "Dr. Ganesh Ahire",
    title: "Consultant Physician – Internal Medicine",
    experience: "7+ Years Experience",
    image: "/ganesh.jpg", // ✅ Correct usage

    qualifications: [
      "MBBS, MD (Medicine) – KEM Hospital, Mumbai",
      "CCEDBM – Evidence-Based Diabetes Management",
      "Fellowship in Nephrology & Dialysis",
      "Fellowship in 2D Echocardiography",
      "EULAR Certified Rheumatologist",
    ],

    description: [
      "Dr. Ganesh Ahire is a board-certified Internal Medicine specialist with over 7 years of experience managing a wide spectrum of medical conditions.",
      "He is known for his compassionate, patient-first approach and expertise in chronic disease management, preventive care, and evidence-based medicine.",
      "His practice spans both inpatient and outpatient care, ensuring continuity and optimized patient outcomes.",
    ],

    expertise: [
      "Internal Medicine & Chronic Disease Management",
      "Diabetes, Hypertension & Cardiac Care",
      "Nephrology & Dialysis Support",
      "Rheumatology (EULAR Certified)",
      "2D Echocardiography",
      "Preventive Healthcare & Wellness Planning",
    ],

    experienceDetails: [
      "Former Assistant Professor – Department of Medicine, KEM Hospital, Mumbai",
      "Consultant Physician – Alexis Hospital",
    ],

    memberships: [
      "MAP – Maharashtra Association of Physicians",
      "BAPI – Bariatric Association of Physicians of India",
    ],
  },
  {
  slug: "dr-khan-ahmed",
  name: "Dr. Khan Ahmed",
  title: "Consultant – Unani Medicine & Surgery",
  experience: "Qualified & Practicing since 2020",
  image: "/ahmed.jpg",

  qualifications: [
    "Kamil-e-Tib-o-Jarahat (BUMS) – Rajiv Gandhi University of Health Sciences, Karnataka"
  ],

  description: [
    "Dr. Khan Ahmed is a qualified Unani Medicine and Surgery practitioner, trained under Rajiv Gandhi University of Health Sciences (RGUHS), Karnataka.",
    "He focuses on holistic and traditional medical approaches with an emphasis on long-term wellness and patient-centered care.",
    "His practice integrates classical Unani principles with modern clinical understanding for effective treatment outcomes."
  ],

  expertise: [
    "General Unani Medicine",
    "Chronic Disease Management",
    "Preventive & Holistic Healthcare",
    "Lifestyle & Diet-Based Treatment",
    "Patient Counseling & Wellness Planning"
  ],

  experienceDetails: [
    "Consultant Unani Physician – Clinical Practice",
  ],

  memberships: [
    "Registered Medical Practitioner – RGUHS"
  ],
}
,
{
  slug: "dr-saman-bano-javed",
  name: "Dr. Khan Saman Bano Javed",
  title: "Consultant – Unani Medicine & Surgery",
  experience: "Qualified & Practicing since 2020",
  image: "/saman.jpg",

  qualifications: [
    "Kamil-e-Tib-o-Jarahat (BUMS) – Rajiv Gandhi University of Health Sciences, Karnataka"
  ],

  description: [
    "Dr. Khan Saman Bano Javed is a qualified Unani Medicine and Surgery doctor, certified by Rajiv Gandhi University of Health Sciences (RGUHS), Karnataka.",
    "She is known for her compassionate, patient-focused approach and emphasis on natural and holistic treatment methods.",
    "Her clinical practice aims at treating root causes through traditional Unani medicine while ensuring patient comfort and trust."
  ],

  expertise: [
    "Unani Medicine & Surgery",
    "Women’s Health & Wellness",
    "Chronic Illness Management",
    "Preventive Healthcare",
    "Diet & Lifestyle Counseling"
  ],

  experienceDetails: [
    "Consultant Unani Physician – Clinical Practice",
  ],

  memberships: [
    "Registered Medical Practitioner – RGUHS"
  ],
}
,
];
