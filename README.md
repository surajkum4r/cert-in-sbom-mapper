# CERT-In SBOM Mapper
This project is created to help generate a Software Bill of Materials (SBOM) compliant with the CERT-In technical guidelines. The guideline mandates the following elements included in the SBOM:

- Component Name  
- Component Version  
- Component Description  
- Hashes  
- Vulnerabilities  
- Criticality  
- Timestamp  
- Unique Identifier  
- Component Origin  
- Component Dependencies  
- Patch Status  
- Release Date  
- End-of-Life Date  
- Usage Restrictions  
- Comments or Notes  
- Component Supplier  
- Executable Property  
- Archive Property  
- Structured Property  
- External References  

For detailed guidelines, refer to the official CERT-In document:  
[Technical Guidelines on SBOM by CERT-In](https://www.cert-in.org.in/PDF/TechnicalGuidelines-on-SBOM)

---

## Why CERT-In SBOM Mapper?

While exploring multiple paid and open-source tools, none fully satisfy all the minimum elements required by the CERT-In guideline. This tool serves as an addon to existing SBOM generators by adding all missing fields and enables exporting the augmented SBOM in CycloneDX and Excel formats.

---

## Features

- Upload tool-generated CycloneDX SBOM files  
- Edit and complete missing mandatory fields as per CERT-In guidelines  
- Export the updated SBOM in CycloneDX JSON and Excel formats for compliance

---

## Getting Started

### Prerequisites

- Node.js (v14 or newer recommended)  
- npm package manager
- Cyclonedx file v1.5

### Installation and Running

1. Clone this repository:  
`git clone https://github.com/surajkum4r/CERT-In-SBOM-Mapper`
2. Navigate into the project directory:  
`cd cert-in-sbom-mapper`
3. Install dependencies:  
`npm install`
4. Start the development server:  
`npm start`
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Upload your tool-generated CycloneDX SBOM file.  
2. Review and edit each component's attributes to ensure compliance with CERT-In mandatory elements.  
3. Save your changes and export the SBOM as JSON or Excel.

---

## Future Updates

- Auto-fetching and populating missing component details from public registries and vulnerability databases  
- Enhanced UI for bulk editing and visualization  
- Support for additional SBOM formats

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repository and create pull requests.


