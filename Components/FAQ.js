export let createFAQ = (targetID) => {
    let faqContent = `
        <div class="faq-container">
            <h2>Frequently Asked Questions (FAQ) - NCR Reports</h2>
            // FAQ lists
            <div class="faq-item">
                <h3 class="faq-question">1. What is an NCR (Non-Conformance Report)?</h3>
                <div class="faq-answer">
                    <p>An NCR is a report used to document non-conformities or defects in products or processes that do not meet the specified requirements.</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">2. How do I generate an NCR?</h3>
                <div class="faq-answer">
                    <p>To generate an NCR, go to the NCR reporting section, complete the necessary details, and submit the form. The report will then be generated and stored in the system.</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">3. What fields are required to create an NCR?</h3>
                <div class="faq-answer">
                    <p>The required fields typically include the defect description, product details, root cause analysis, corrective actions, and responsible parties.</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">4. Can I update an NCR once it has been submitted?</h3>
                <div class="faq-answer">
                    <p>Yes, as long as the NCR is still in the open or under review status, you can update its details. Once it is closed, no further edits can be made.</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">5. How do I track the status of an NCR?</h3>
                <div class="faq-answer">
                    <p>You can track the status of your NCR in the system under the "NCR Tracking" section. It will show the current status such as "Open", "Under Review", or "Closed".</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">6. What should I do if I find an issue with an NCR?</h3>
                <div class="faq-answer">
                    <p>If you encounter an issue with an NCR, report it to the responsible team for further investigation and correction. You can also submit a new NCR if necessary.</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">7. Can NCR reports be shared with external stakeholders?</h3>
                <div class="faq-answer">
                    <p>Yes, NCR reports can be shared with external stakeholders, such as suppliers or regulatory bodies, depending on the confidentiality level and the specifics of the report.</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">8. How do I close an NCR?</h3>
                <div class="faq-answer">
                    <p>Once all corrective actions have been completed and verified, the NCR can be marked as closed. Ensure all relevant actions are documented before closing the NCR.</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">9. How can I access historical NCR reports?</h3>
                <div class="faq-answer">
                    <p>Historical NCR reports can be accessed through the NCR Reporting Dashboard, where you can filter and view past reports based on various criteria like status, date, and department.</p>
                </div>
            </div>
            <div class="faq-item">
                <h3 class="faq-question">10. What is the purpose of corrective actions in an NCR?</h3>
                <div class="faq-answer">
                    <p>Corrective actions are steps taken to address the root cause of the non-conformance. They aim to prevent similar issues from occurring in the future by correcting the process or product deficiencies.</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById(targetID).innerHTML = faqContent;

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
            if (answer.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });
};
