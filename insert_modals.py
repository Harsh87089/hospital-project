import sys
sys.stdout.reconfigure(encoding='utf-8')

modal_html = """
    <!-- Symptom Checker Modal -->
    <div class="service-layer-modal" id="symptom-checker-modal" role="dialog" aria-modal="true" aria-labelledby="symptom-checker-title">
        <div class="service-layer-container" style="max-width:680px;">
            <div class="service-layer-header">
                <div class="service-layer-header-left">
                    <div class="service-layer-icon" style="background:linear-gradient(135deg,#ede9fe,#ddd6fe);color:#7c3aed;">&#x1f9ea;</div>
                    <div class="service-layer-title-wrap">
                        <span class="layer-badge" style="background:#ede9fe;color:#5b21b6;">SMART TRIAGE TOOL</span>
                        <h2 id="symptom-checker-title">Symptom Checker</h2>
                        <p>Answer 2 quick questions to find the right specialist for your symptoms</p>
                    </div>
                </div>
                <div class="service-layer-header-actions">
                    <button class="modal-close-btn" data-action="close-symptom-checker" aria-label="Close">&times;</button>
                </div>
            </div>
            <div class="service-layer-body">
                <div class="symptom-progress" id="symptom-progress">
                    <div class="symptom-progress-dot active"></div>
                    <div class="symptom-progress-dot"></div>
                    <div class="symptom-progress-dot"></div>
                </div>
                <div class="symptom-tree-step active" id="symptom-step-1">
                    <div class="symptom-question">&#x1f64b; Which part of your body is affected?</div>
                    <div class="symptom-options-grid">
                        <button class="symptom-option-btn" data-area="heart" data-next="2"><span class="symptom-option-icon">&#x2764;&#xfe0f;</span> Heart &amp; Chest</button>
                        <button class="symptom-option-btn" data-area="bones" data-next="2"><span class="symptom-option-icon">&#x1f9b4;</span> Bones &amp; Joints</button>
                        <button class="symptom-option-btn" data-area="skin" data-next="2"><span class="symptom-option-icon">&#x2728;</span> Skin &amp; Hair</button>
                        <button class="symptom-option-btn" data-area="stomach" data-next="2"><span class="symptom-option-icon">&#x1fac1;</span> Stomach &amp; Digestion</button>
                        <button class="symptom-option-btn" data-area="child" data-next="2"><span class="symptom-option-icon">&#x1f476;</span> Child Health</button>
                        <button class="symptom-option-btn" data-area="womens" data-next="2"><span class="symptom-option-icon">&#x1f338;</span> Women&#39;s Health</button>
                        <button class="symptom-option-btn" data-area="ent" data-next="2"><span class="symptom-option-icon">&#x1f442;</span> Ear, Nose &amp; Throat</button>
                        <button class="symptom-option-btn" data-area="eye" data-next="2"><span class="symptom-option-icon">&#x1f441;&#xfe0f;</span> Eye &amp; Vision</button>
                        <button class="symptom-option-btn" data-area="dental" data-next="2"><span class="symptom-option-icon">&#x1f9b7;</span> Dental &amp; Oral</button>
                        <button class="symptom-option-btn" data-area="general" data-next="2"><span class="symptom-option-icon">&#x1fa7a;</span> General / Fever / Fatigue</button>
                    </div>
                </div>
                <div class="symptom-tree-step" id="symptom-step-2">
                    <button class="symptom-back-btn" id="symptom-back-btn-2">&#8592; Back</button>
                    <div class="symptom-question">&#x26a1; How would you rate your discomfort?</div>
                    <div class="symptom-options-grid">
                        <button class="symptom-option-btn" data-severity="mild" data-next="result"><span class="symptom-option-icon">&#x1f60a;</span> Mild &#8211; Manageable</button>
                        <button class="symptom-option-btn" data-severity="moderate" data-next="result"><span class="symptom-option-icon">&#x1f610;</span> Moderate &#8211; Affecting daily life</button>
                        <button class="symptom-option-btn" data-severity="severe" data-next="result"><span class="symptom-option-icon">&#x1f623;</span> Severe &#8211; Limiting activities</button>
                        <button class="symptom-option-btn" data-severity="emergency" data-next="result"><span class="symptom-option-icon">&#x1f6a8;</span> Emergency &#8211; Chest pain / Fainting</button>
                    </div>
                </div>
                <div class="symptom-tree-step" id="symptom-step-result">
                    <button class="symptom-back-btn" id="symptom-back-btn-result">&#8592; Try Again</button>
                    <div class="symptom-result-card" id="symptom-result-card">
                        <div class="symptom-result-icon" id="symptom-result-icon">&#x1f468;&#x200d;&#x2695;&#xfe0f;</div>
                        <div class="symptom-result-dept" id="symptom-result-dept">General Physician</div>
                        <div class="symptom-result-desc" id="symptom-result-desc">Based on your symptoms, we recommend a consultation with our General Physician.</div>
                        <div class="symptom-result-actions">
                            <button type="button" class="btn btn-primary" id="symptom-book-btn" data-action="open-booking-layer">Book Appointment &#x279c;</button>
                            <button type="button" class="btn btn-outline" id="symptom-doc-btn" data-action="open-doctors-modal">View Specialists</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Doctor Review Modal -->
    <div class="service-layer-modal" id="doctor-review-modal" role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
        <div class="service-layer-container" style="max-width:520px;">
            <div class="service-layer-header">
                <div class="service-layer-header-left">
                    <div class="service-layer-icon" style="background:#fef9c3;color:#a16207;">&#x2b50;</div>
                    <div class="service-layer-title-wrap">
                        <span class="layer-badge" style="background:#fef9c3;color:#92400e;">PATIENT REVIEW</span>
                        <h2 id="review-modal-title">Rate Your Doctor</h2>
                        <p id="review-modal-doctor-name">Share your demo experience</p>
                    </div>
                </div>
                <div class="service-layer-header-actions">
                    <button class="modal-close-btn" data-action="close-review-modal" aria-label="Close">&times;</button>
                </div>
            </div>
            <div class="service-layer-body">
                <p style="text-align:center;font-size:0.875rem;color:var(--slate-500);margin-bottom:1rem;">How was your consultation experience? (Demo)</p>
                <div class="review-modal-stars" id="review-star-row" aria-label="Rate out of 5 stars">
                    <button class="review-star-btn" data-star="1" aria-label="1 star">&#9733;</button>
                    <button class="review-star-btn" data-star="2" aria-label="2 stars">&#9733;</button>
                    <button class="review-star-btn" data-star="3" aria-label="3 stars">&#9733;</button>
                    <button class="review-star-btn" data-star="4" aria-label="4 stars">&#9733;</button>
                    <button class="review-star-btn" data-star="5" aria-label="5 stars">&#9733;</button>
                </div>
                <div style="margin-bottom:1rem;">
                    <textarea id="review-text-input" rows="3" placeholder="Tell others about your experience (optional)..." style="width:100%;padding:0.75rem 1rem;border:1.5px solid var(--slate-200);border-radius:10px;font-size:0.9rem;resize:vertical;font-family:inherit;"></textarea>
                </div>
                <div style="font-size:0.75rem;color:var(--slate-400);margin-bottom:1.25rem;padding:0.5rem;background:var(--slate-50);border-radius:8px;border:1px solid var(--slate-100);">
                    &#9888;&#xfe0f; Demo Only &#8211; Reviews stored locally. Portfolio prototype.
                </div>
                <button type="button" class="btn btn-primary" style="width:100%;" id="submit-review-btn" data-action="submit-doctor-review">Submit Review (Demo)</button>
                <div class="doctor-reviews-panel" id="doctor-reviews-panel"></div>
            </div>
        </div>
    </div>

"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Insert before </body>
content = content.replace('</body>', modal_html + '</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done. Total lines:', len(content.splitlines()))
