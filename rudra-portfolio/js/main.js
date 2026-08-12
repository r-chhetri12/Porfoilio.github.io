/* ==========================================================================
   Rudra Chhetri Portfolio - Main Interactive Logic
   Handles Typewriter, Scroll-Driven Skill Fills, Resume Modal, AI Workflow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dynamic Typewriter Effect
  const typedSpan = document.querySelector('.typed-text');
  if (typedSpan) {
    const roles = [
      'Data Analyst',
      'AI-Empowered BI Specialist',
      'Data Storyteller',
      'SQL & Python Problem Solver'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typedSpan.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typedSpan.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }

  // 2. SCROLL-DRIVEN Skill Fill Animations (Strictly triggers when scrolled into view)
  const skillSection = document.getElementById('skills');
  const progressFills = document.querySelectorAll('.progress-bar-fill');

  // Ensure all skill progress bars start at 0% width
  progressFills.forEach(fill => {
    fill.style.width = '0%';
  });

  if (skillSection && progressFills.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Trigger animation ONLY when the user scrolls down to the skills section
        if (entry.isIntersecting) {
          progressFills.forEach((fill, index) => {
            const targetPct = fill.getAttribute('data-pct') || '85%';
            // Stagger animation slightly for each bar for high visual impact
            setTimeout(() => {
              fill.style.width = targetPct;
            }, index * 120);
          });
          observer.unobserve(entry.target); // Trigger only once when scrolled into view
        }
      });
    }, { 
      threshold: 0.25, // Must be 25% visible in viewport
      rootMargin: '0px 0px -50px 0px' 
    });

    observer.observe(skillSection);
  }

  // 3. Project Tag Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags') || '';
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // 4. Toggle Live Chart Overlay inside Project Cards
  window.toggleLiveChart = function(btn) {
    const card = btn.closest('.project-card');
    if (!card) return;
    card.classList.toggle('show-live-chart');
    if (card.classList.contains('show-live-chart')) {
      btn.innerHTML = '<i class="fas fa-image"></i> View Screenshot';
    } else {
      btn.innerHTML = '<i class="fas fa-chart-line"></i> Live Interactive Chart';
    }
  };

  // 5. Interactive Case Study Modal Data
  const modalData = {
    churn: {
      title: 'Telecom Customer Churn Analysis & Risk Model',
      badge: 'SQL + Python + Power BI + ChatGPT',
      overview: 'Solved an $8M revenue-loss problem by identifying why 27% of telecom customers (1,869) were churning, using SQL for data cleaning and Python for statistical analysis (chi-square tests) to isolate the real drivers.',
      tools: 'SQL (Aggregations, CASE statements, Data Cleaning), Python (Pandas, NumPy, Matplotlib, SciPy), Power BI (DAX, Power Query, Churn-Reason Tooltips), ChatGPT (Chi-square test scripting).',
      insights: [
        'Month-to-month contracts churn at 46% vs 3% for 2-year contracts.',
        'New customers (0–1 month tenure) churn at 62%, pinpointing onboarding friction.',
        'Delivered interactive Power BI dashboard with churn-reason tooltips, surfacing "Competitor switching" as the #1 cause (45% of churn).',
        'Used ChatGPT to speed up exploratory Python scripting and draft chi-square test code, cutting analysis time while validating every result manually.'
      ],
      github: 'https://github.com/r-chhetri12/customer-churn-analysis-dashboard',
      pbix: 'https://github.com/r-chhetri12/customer-churn-analysis-dashboard/blob/main/churn%20analysis.pbix'
    },
    sales: {
      title: 'Sales Performance & Profitability Executive Dashboard',
      badge: 'Power Query + SQL + DAX + Power BI',
      overview: 'Solved a visibility problem across $34M in sales and $21M in profit by cleaning data in Power Query, analyzing performance in SQL, and building DAX measures to track KPIs by region, category, and salesperson.',
      tools: 'Power Query (Data Cleaning & Transformation), SQL, DAX (Dynamic Measures), Power BI (Dynamic Measure Selector), ChatGPT & Claude (AI-assisted DAX prototyping).',
      insights: [
        'Built a dynamic measure selector in Power BI so stakeholders can switch between Sales, Boxes, Shipments, Profit, and Cost trends in one visual instead of five.',
        'Identified New Zealand and the Bars category as top revenue drivers.',
        'Uncovered a December sales peak paired with a January cost spike — flagging a fulfillment-timing fix to improve margins.',
        'Leveraged AI-assisted DAX and Power Query prompts to prototype measures faster, then refined and tested them for accuracy before final delivery.'
      ],
      github: 'https://github.com/r-chhetri12/sales-analysis-dashboard',
      pbix: 'https://github.com/r-chhetri12/sales-analysis-dashboard/blob/main/Sales_report_1.pbix'
    },
    hr: {
      title: 'HR Employee Attrition Diagnostic & Retention Report',
      badge: 'SQL + Power BI + DAX',
      overview: 'Solved a retention problem behind a 51% attrition rate (1,460 employees) by using SQL to segment attrition by age, tenure, department, and satisfaction, visualized in an interactive Power BI dashboard.',
      tools: 'SQL (Data Aggregation, CTEs, Age/Tenure Bucketing), Power BI (Interactive Dashboards, DAX, Department Slicers).',
      insights: [
        'Found first-year employees drive the most exits (687, highest of any tenure band).',
        '1,325 high performers left despite good work-life-balance scores, pointing HR toward onboarding and career growth as fixes.',
        'Pinpointed Production as the highest-risk department (974 exits) and gave HR a targeted list of roles to prioritize for retention.'
      ],
      github: 'https://github.com/r-chhetri12/employee-attrition-sql-analysis-dashboard',
      pbix: 'https://github.com/r-chhetri12/employee-attrition-sql-analysis-dashboard/blob/main/HR_Report.pbix'
    },
    calls: {
      title: 'Call Center Operational Performance Dashboard',
      badge: 'Excel + Power Query + Pivot Tables',
      overview: 'Created an interactive dashboard to analyze call center performance, including call volume, revenue, call duration, customer satisfaction, and representative performance.',
      tools: 'Microsoft Excel (Pivot Tables, Pivot Charts, Dynamic Slicers), Power Query (Data cleaning & transformation), Measures / Calculations.',
      insights: [
        'March and April show the highest call volumes, indicating peak demand periods.',
        'Columbus has the highest male caller count, while Cleveland has more female callers.',
        'Representative R02 and R03 led in overall revenue generation.',
        'Average customer rating is 3.9/5.0, indicating room for service quality improvement.',
        'Weekends (Saturday & Sunday) have higher call volumes, informing staffing decisions.'
      ],
      github: 'https://github.com/r-chhetri12/Call-Center-dashboard',
      pbix: 'https://github.com/r-chhetri12/Call-Center-dashboard/blob/main/Call%20center.xlsx'
    }
  };

  window.openProjectModal = function(key) {
    const data = modalData[key];
    if (!data) return;

    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content-area');

    if (overlay && content) {
      let insightsHTML = '';
      data.insights.forEach(item => {
        insightsHTML += `<li>${item}</li>`;
      });

      content.innerHTML = `
        <span class="tag-pill" style="margin-bottom: 12px; display: inline-block;">${data.badge}</span>
        <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 16px; color: #f8fafc;">${data.title}</h2>
        
        <p style="font-size: 15px; color: #94a3b8; line-height: 1.7; margin-bottom: 24px;">${data.overview}</p>
        
        <h4 style="color: #38bdf8; margin-bottom: 8px; font-weight: 700;">Technical Stack & AI Workflow</h4>
        <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 24px; line-height: 1.6;">${data.tools}</p>
        
        <h4 style="color: #fb7185; margin-bottom: 12px; font-weight: 700;">Key Business Outcomes & Insights</h4>
        <ul class="project-highlights" style="margin-bottom: 32px;">${insightsHTML}</ul>
        
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="${data.github}" target="_blank" class="btn-cta-primary" style="padding: 10px 24px; font-size: 14px;">
            <i class="fab fa-github"></i> View GitHub Repository
          </a>
          <a href="${data.pbix}" target="_blank" class="btn-cta-secondary" style="padding: 10px 24px; font-size: 14px;">
            <i class="fas fa-download"></i> Download Project File
          </a>
        </div>
      `;
      overlay.classList.add('active');
    }
  };

  // 6. Interactive Resume Viewer Modal
  window.openResumeModal = function() {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content-area');

    if (overlay && content) {
      content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px;">
          <div>
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #f8fafc; margin-bottom: 4px;">RUDRA CHHETRI</h2>
            <p style="color: #38bdf8; font-weight: 600; font-size: 14px;">Data Analyst • Vadodara, Gujarat, India • +91 7043246316</p>
          </div>
          <button onclick="copyResumeText()" class="btn-copy-action" style="padding: 8px 16px; font-size: 13px;">
            <i class="fas fa-copy"></i> Copy Resume Text
          </button>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="color: #a78bfa; font-size: 16px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">PROFILE SUMMARY</h3>
          <p style="font-size: 14px; color: #cbd5e1; line-height: 1.7;">
            Data Analyst with hands-on project experience analyzing HR, sales, and telecom data using Excel, SQL, Power BI, and Python. Skilled at cleaning and transforming raw data into clear dashboards and insights that support business decisions. Comfortable using <b>AI tools (ChatGPT, GitHub Copilot, Claude)</b> to speed up data cleaning, SQL/DAX writing, and reporting without compromising accuracy. Strong logical thinking, data storytelling, and communication skills.
          </p>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="color: #a78bfa; font-size: 16px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">INTERNSHIP EXPERIENCE</h3>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: #f8fafc; font-size: 15px;">
              <span>Frontend Web Developer Intern — Mamo Technolabs LLP</span>
              <span style="color: #94a3b8; font-size: 13px;">Dec 2024 – Apr 2025</span>
            </div>
            <ul style="margin: 10px 0 0 18px; font-size: 13px; color: #94a3b8; line-height: 1.6;">
              <li>Developed and maintained responsive web pages and UI components using HTML, CSS, and JavaScript.</li>
              <li>Wrote and optimized SQL queries to retrieve and manage application data, strengthening database and data-handling skills that now support data analysis work.</li>
            </ul>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="color: #a78bfa; font-size: 16px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">EDUCATION</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
              <div style="font-weight: 700; color: #f8fafc; font-size: 14px;">Bachelor of Computer Applications (BCA)</div>
              <div style="font-size: 13px; color: #38bdf8;">The Maharaja Sayajirao University of Baroda</div>
              <div style="font-size: 12px; color: #64748b;">2022 – 2025 | Vadodara, India</div>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
              <div style="font-weight: 700; color: #f8fafc; font-size: 14px;">Higher Secondary Education</div>
              <div style="font-size: 13px; color: #38bdf8;">Anant School of Excellence</div>
              <div style="font-size: 12px; color: #64748b;">2020 – 2022 | Ahmedabad, India</div>
            </div>
          </div>
        </div>

        <div>
          <h3 style="color: #a78bfa; font-size: 16px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">TECHNICAL & AI SKILLS</h3>
          <div style="font-size: 13px; color: #cbd5e1; line-height: 1.8;">
            <p><b>Technical & Analytics:</b> Power BI (DAX, Power Query) • Python (Pandas, NumPy, Matplotlib, SciPy) • SQL (MySQL, SQL Server) • Excel (Pivot Tables, XLOOKUP, Charts) • Data Storytelling • Business Understanding • Problem Solving</p>
            <p><b>AI Tools & Productivity:</b> ChatGPT & Claude (data cleaning, SQL/DAX/Python drafting, report writing) • GitHub Copilot (code assistance) • AI-assisted Excel & Power BI formula building • Prompt Engineering for analytics</p>
            <p><b>Languages:</b> English (Fluent) • Hindi (Fluent) • Gujarati (Fluent)</p>
          </div>
        </div>
      `;
      overlay.classList.add('active');
    }
  };

  window.closeModal = function() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
  };

  // Close modal on click outside
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) window.closeModal();
    });
  }

  // 7. One-Click Copy Functions
  window.copyText = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${label} copied to clipboard: ${text}`);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  window.copyResumeText = function() {
    const resumeText = `RUDRA CHHETRI - Data Analyst
Vadodara, Gujarat, India | +91 7043246316 | chhetrirudra70@gmail.com
LinkedIn: https://www.linkedin.com/in/rudra-chhetri-832534340/
GitHub: https://github.com/r-chhetri12

PROFILE SUMMARY:
Data Analyst with hands-on project experience analyzing HR, sales, and telecom data using Excel, SQL, Power BI, and Python. Comfortable using AI tools (ChatGPT, GitHub Copilot, Claude) to speed up data cleaning, SQL/DAX writing, and reporting without compromising accuracy.

EDUCATION:
- Bachelor of Computer Applications (BCA) | MSU Baroda (2022 - 2025)
- Higher Secondary Education | Anant School of Excellence (2020 - 2022)

INTERNSHIP EXPERIENCE:
- Frontend Web Developer Intern — Mamo Technolabs LLP (Dec 2024 – Apr 2025)

PROJECTS:
1. Telecom Customer Churn Analysis (SQL, Python, Power BI, DAX) - Solved $8M revenue loss risk.
2. Sales Performance Dashboard (Power Query, SQL, DAX, Power BI) - Visibility across $34M sales & $21M profit.
3. HR Attrition Analysis Dashboard (SQL, Power BI, DAX) - Solved retention problem for 1,460 employees.
4. Call Center Analytics Dashboard (Excel, Power Query, Pivot Tables) - Performance & CSAT analysis.`;

    navigator.clipboard.writeText(resumeText).then(() => {
      alert('Full resume text copied to clipboard!');
    });
  };
});
