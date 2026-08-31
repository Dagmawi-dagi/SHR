<template>
  <div class="employee-form-container">
    <!-- Header -->
    <div class="form-header">
      <div class="header-icon-wrapper">
        <i class="fas fa-file-alt"></i>
        <h1>የሠራተኞች ቅጽ (Employee Registration Form)</h1>
        <i class="fas fa-user-check"></i>
      </div>
      <p class="header-subtitle">በጡረታ አዋጅ ቁጥር / የሠራተኛ መዝገብ | መረጃ በሙሉ በትክክል ይሙሉ</p>
    </div>

    <form @submit.prevent="submitForm">
      <!-- 1. Personal Info -->
      <div class="form-section section-blue">
        <div class="section-title">
          <i class="fas fa-user-circle"></i>
          <h2>1. የሠራተኛው መረጃ / Employee Information</h2>
        </div>
        <div class="form-grid grid-3">
          <div class="field">
            <label>የሠራተኛ መታወቂያ ቁጥር (ID)</label>
            <input type="text" v-model="employeeId" placeholder="ለምሳሌ: 0003600429">
          </div>
          <div class="field">
            <label>ስም (First Name)</label>
            <input type="text" v-model="firstName" placeholder="አሸናፊ">
          </div>
          <div class="field">
            <label>የአባት ስም (Father's Name)</label>
            <input type="text" v-model="fatherName" placeholder="ንጉሱ">
          </div>
          <div class="field">
            <label>የአያት ስም (Grandfather's Name)</label>
            <input type="text" v-model="grandfatherName" placeholder="ብዙአለም">
          </div>
          <div class="field">
            <label>ጾታ (Gender)</label>
            <div class="radio-group">
              <label><input type="radio" value="male" v-model="gender"> ወንድ</label>
              <label><input type="radio" value="female" v-model="gender"> ሴት</label>
            </div>
          </div>
          <div class="field">
            <label>የትውልድ ቀን (Birth Date) እ.ኢ.አ</label>
            <input type="date" v-model="birthDate">
          </div>
        </div>
      </div>

      <!-- 2. Address & Contact -->
      <div class="form-section section-green">
        <div class="section-title">
          <i class="fas fa-map-marker-alt"></i>
          <h2>2. አድራሻ እና መገናኛ / Address & Contact</h2>
        </div>
        <div class="form-grid grid-3">
          <div class="field"><label>ክልል / መስተዳድር</label><input v-model="region"></div>
          <div class="field"><label>ክፍለ ከተማ / ዞን (Zone)</label><input v-model="zone" placeholder="ንፋስ ስልክ ላፍቶ"></div>
          <div class="field"><label>ወረዳ / ቀበሌ</label><input v-model="woreda"></div>
          <div class="field"><label>የቤት ቁጥር</label><input v-model="houseNumber" placeholder="1052"></div>
          <div class="field"><label>ስልክ (Phone)</label><input type="tel" v-model="phone" placeholder="0911689799"></div>
          <div class="field"><label>ኢ-ሜይል (E-mail)</label><input type="email" v-model="email" placeholder="example@email.com"></div>
        </div>
      </div>

      <!-- 3. Spouse Information -->
      <div class="form-section section-purple">
        <div class="section-title">
          <i class="fas fa-heart"></i>
          <h2>3. የትዳር ጓደኛ መረጃ (Spouse Information)</h2>
        </div>
        <div class="form-grid grid-4">
          <div class="field"><label>ስም (የባል/ሚስት)</label><input v-model="spouseFirstName"></div>
          <div class="field"><label>የአባት ስም</label><input v-model="spouseFatherName"></div>
          <div class="field"><label>የአያት ስም</label><input v-model="spouseGrandfatherName"></div>
          <div class="field"><label>የልደት ዘመን</label><input type="date" v-model="spouseBirthDate"></div>
        </div>
      </div>

      <!-- 4. Dependents Table -->
      <div class="form-section section-yellow">
        <div class="section-title between">
          <div><i class="fas fa-child"></i><h2>4. ጥገኞች (ዕድሜያቸው ከ18 በታች ወይም አካል ጉዳተኛ ከ21 በታች)</h2></div>
          <button type="button" @click="addDependent" class="btn-add"><i class="fas fa-plus"></i> አዲስ ልጅ ጨምር</button>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr><th>#</th><th>ስም</th><th>የአባት ስም</th><th>የእናት ስም</th><th>የትውልድ ቀን</th><th>ጾታ</th><th>አካል ጉዳት</th><th>የጉዲፈቻ ልጅ</th><th></th></tr>
            </thead>
            <tbody>
              <tr v-for="(dep, idx) in dependents" :key="dep.id">
                <td class="text-center">{{ idx+1 }}</td>
                <td><input v-model="dep.firstName"></td>
                <td><input v-model="dep.fatherName"></td>
                <td><input v-model="dep.motherName"></td>
                <td><input type="date" v-model="dep.birthDate"></td>
                <td><select v-model="dep.gender"><option value="male">ወንድ</option><option value="female">ሴት</option></select></td>
                <td class="text-center"><input type="checkbox" v-model="dep.hasDisability"></td>
                <td class="text-center"><input type="checkbox" v-model="dep.isAdopted"></td>
                <td class="text-center"><button type="button" @click="removeDependent(idx)" class="btn-remove"><i class="fas fa-trash-alt"></i></button></td>
              </tr>
              <tr v-if="dependents.length === 0"><td colspan="9" class="text-center text-muted">ምንም ጥገኞች የሉም</td></tr>
            </tbody>
          </table>
        </div>
        <p class="note">ማስታወሻ: አካል ጉዳተኛ ከሆነ ማስረጃ ማያያዝ አለበት።</p>
      </div>

      <!-- 5. Employment History -->
      <div class="form-section section-red">
        <div class="section-title between">
          <div><i class="fas fa-briefcase"></i><h2>5. የቀድሞ አገልግሎት እና የጡረታ መዋጮ ታሪክ</h2></div>
          <button type="button" @click="addEmployment" class="btn-add"><i class="fas fa-plus"></i> ልምድ ጨምር</button>
        </div>
        <div class="table-wrapper">
          <table class="data-table wide">
            <thead>
              <tr><th>#</th><th>የድርጅቱ ግብር ከፋይ መለያ</th><th>የአገልግሎት ዓይነት</th><th>ከ (ቀን)</th><th>እስከ (ቀን)</th><th>የመጨረሻ ደሞዝ</th><th>የሚሰናበትበት ምክንያት</th><th>ሲሰናበቱ የተከፈለ</th><th></th></tr>
            </thead>
            <tbody>
              <tr v-for="(emp, idx) in employmentHistory" :key="emp.id">
                <td class="text-center">{{ idx+1 }}</td>
                <td><input v-model="emp.employerTaxId"></td>
                <td><select v-model="emp.serviceType"><option value="">ይምረጡ</option><option value="military">ወታደር</option><option value="civil">ሲቪል</option><option value="private">የግል ድርጅት</option><option value="provident">ፕሮቪደንት ፈንድ</option></select></td>
                <td><input type="date" v-model="emp.startDate"></td>
                <td><input type="date" v-model="emp.endDate"></td>
                <td><input type="number" v-model="emp.lastSalary" placeholder="ብር"></td>
                <td><input v-model="emp.terminationReason"></td>
                <td><input type="number" v-model="emp.finalSalaryPaid"></td>
                <td class="text-center"><button type="button" @click="removeEmployment(idx)" class="btn-remove"><i class="fas fa-trash-alt"></i></button></td>
              </tr>
              <tr v-if="employmentHistory.length===0"><td colspan="9" class="text-center text-muted">ምንም የቀድሞ ልምድ የለም</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 6. Declaration -->
      <div class="form-section section-indigo">
        <div class="section-title">
          <i class="fas fa-check-circle"></i>
          <h2>6. ማረጋገጫ እና ውሳኔ / Declaration & Confirmation</h2>
        </div>
        <div class="declaration-box">
          <label><input type="checkbox" v-model="checkboxes.chk1"> 1. በዚህ ቅጽ የቀረበው መረጃ ሁሉ እውነት እና ትክክል መሆኑን እረጋገጣለሁ ።</label>
          <label><input type="checkbox" v-model="checkboxes.chk2"> 2. ማንኛውም የአካል / የአእምሮ ጉዳት ካለ በማስረጃ አቅርቤያለሁ</label>
          <label><input type="checkbox" v-model="checkboxes.chk3"> 3. ከዚህ በፊት በሌላ ተቋም የነበረኝ የሠራተኛ መዝገብ እንዳለ ገልጼያለሁ</label>
          <label><input type="checkbox" v-model="checkboxes.chk4"> 4. ቅጽ ጡ-1 መስፈርቶች ተሟልተዋል ፣ ማንኛውም ሐሰት መረጃ የሕግ ቅጣት እንደሚያስከትል ተገንዝቤያለሁ</label>
        </div>
        <div class="form-grid grid-2">
          <div class="field"><label>የሠራተኛው ፊርማ</label><input v-model="employeeSignature"></div>
          <div class="field"><label>ቀን (Date)</label><input type="date" v-model="signatureDate"></div>
        </div>
      </div>

      <!-- 7. Employer Info -->
      <div class="form-section section-teal">
        <div class="section-title">
          <i class="fas fa-building"></i>
          <h2>7. የአሠሪው መረጃ (Employer Information)</h2>
        </div>
        <div class="form-grid grid-2">
          <div class="field"><label>የድርጅት ስም</label><input v-model="employerName"></div>
          <div class="field"><label>የአሠሪ ተወካይ ስም</label><input v-model="employerRepName"></div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn-reset"><i class="fas fa-undo-alt"></i> ቅጽ አጽዳ</button>
        <button type="submit" class="btn-submit"><i class="fas fa-save"></i> መረጃ አስገባ / አስረክብ</button>
      </div>

      <div class="footer-note">
        © 2025 የሠራተኛ ምዝገባ ቅጽ - በኢትዮጵያ የሠራተኛ ሕግ መሠረት
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Employee personal data
const employeeId = ref('');
const firstName = ref('');
const fatherName = ref('');
const grandfatherName = ref('');
const gender = ref('male');
const birthDate = ref('');
const region = ref('አዲስ አበባ');
const zone = ref('');
const woreda = ref('');
const houseNumber = ref('');
const phone = ref('');
const email = ref('');

// Spouse
const spouseFirstName = ref('');
const spouseFatherName = ref('');
const spouseGrandfatherName = ref('');
const spouseBirthDate = ref('');

// Dependents
const dependents = ref([
  { id: Date.now(), firstName: '', fatherName: '', motherName: '', birthDate: '', gender: 'male', hasDisability: false, isAdopted: false }
]);
const addDependent = () => {
  dependents.value.push({ id: Date.now(), firstName: '', fatherName: '', motherName: '', birthDate: '', gender: 'male', hasDisability: false, isAdopted: false });
};
const removeDependent = (index) => {
  if (dependents.value.length > 1) dependents.value.splice(index, 1);
  else alert("ቢያንስ አንድ መዝገብ መኖር አለበት። ባዶ ሆኖ ሊቆይ ይችላል።");
};

// Employment history
const employmentHistory = ref([
  { id: Date.now(), employerTaxId: '', serviceType: '', startDate: '', endDate: '', lastSalary: '', terminationReason: '', finalSalaryPaid: '' }
]);
const addEmployment = () => {
  employmentHistory.value.push({ id: Date.now(), employerTaxId: '', serviceType: '', startDate: '', endDate: '', lastSalary: '', terminationReason: '', finalSalaryPaid: '' });
};
const removeEmployment = (index) => {
  if (employmentHistory.value.length > 1) employmentHistory.value.splice(index, 1);
  else alert("ቢያንስ አንድ ረድፍ መቆየት አለበት።");
};

// Checkboxes declaration
const checkboxes = reactive({
  chk1: false,
  chk2: false,
  chk3: false,
  chk4: false
});

const employeeSignature = ref('');
const signatureDate = ref('');
const employerName = ref('');
const employerRepName = ref('');

// Submit handler
const submitForm = () => {
  const formPayload = {
    employeeId: employeeId.value,
    fullName: { firstName: firstName.value, fatherName: fatherName.value, grandfatherName: grandfatherName.value },
    gender: gender.value,
    birthDate: birthDate.value,
    contact: { region: region.value, zone: zone.value, woreda: woreda.value, houseNumber: houseNumber.value, phone: phone.value, email: email.value },
    spouse: { firstName: spouseFirstName.value, fatherName: spouseFatherName.value, grandfatherName: spouseGrandfatherName.value, birthDate: spouseBirthDate.value },
    dependents: dependents.value.map(d => ({ ...d })),
    employmentHistory: employmentHistory.value.map(e => ({ ...e })),
    declarations: { ...checkboxes },
    employeeSignature: employeeSignature.value,
    signatureDate: signatureDate.value,
    employer: { name: employerName.value, repName: employerRepName.value }
  };
  console.log("የቅጽ መረጃ ሙሉ ዝርዝር:", formPayload);
  alert("መረጃዎ በተሳካ ሁኔታ ተመዝግቧል! (ዝርዝሩ በኮንሶል ይገኛል) \n እባክዎ ማረጋገጫ ሰነዶች ካሉ ከቅጹ ጋር ያያይዙ።");
};

// Reset form
const resetForm = () => {
  if (confirm("ሁሉንም መረጃ መሰረዝ ይፈልጋሉ? ይህ ድርጊት ሊቀለበስ አይችልም።")) {
    employeeId.value = ''; firstName.value = ''; fatherName.value = ''; grandfatherName.value = '';
    gender.value = 'male'; birthDate.value = ''; region.value = 'አዲስ አበባ'; zone.value = ''; woreda.value = '';
    houseNumber.value = ''; phone.value = ''; email.value = '';
    spouseFirstName.value = ''; spouseFatherName.value = ''; spouseGrandfatherName.value = ''; spouseBirthDate.value = '';
    dependents.value = [{ id: Date.now(), firstName: '', fatherName: '', motherName: '', birthDate: '', gender: 'male', hasDisability: false, isAdopted: false }];
    employmentHistory.value = [{ id: Date.now(), employerTaxId: '', serviceType: '', startDate: '', endDate: '', lastSalary: '', terminationReason: '', finalSalaryPaid: '' }];
    checkboxes.chk1 = false; checkboxes.chk2 = false; checkboxes.chk3 = false; checkboxes.chk4 = false;
    employeeSignature.value = ''; signatureDate.value = ''; employerName.value = ''; employerRepName.value = '';
  }
};
</script>

<style scoped>
/* ========== GLOBAL STYLES ========== */
.employee-form-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
  background-color: #f3f4f6;
}

/* Header */
.form-header {
  text-align: center;
  border-bottom: 2px solid #1e3a8a;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}
.header-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  color: #1e3a8a;
}
.header-icon-wrapper h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #1e3a8a;
}
.header-subtitle {
  color: #4b5563;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Form Sections */
.form-section {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1.25rem;
  margin-bottom: 2rem;
  border-left-width: 8px;
  border-left-style: solid;
}
.section-blue { border-left-color: #2563eb; }
.section-green { border-left-color: #16a34a; }
.section-purple { border-left-color: #9333ea; }
.section-yellow { border-left-color: #ca8a04; }
.section-red { border-left-color: #dc2626; }
.section-indigo { border-left-color: #4f46e5; }
.section-teal { border-left-color: #0d9488; }

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
  margin-bottom: 1.25rem;
}
.section-title i {
  font-size: 1.5rem;
  color: #1f2937;
}
.section-title h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  color: #1f2937;
}
.between {
  justify-content: space-between;
  flex-wrap: wrap;
}

/* Form Grids */
.form-grid {
  display: grid;
  gap: 1rem;
}
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

.field {
  display: flex;
  flex-direction: column;
}
.field label {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #374151;
}
.field input, .field select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: 0.2s;
}
.field input:focus, .field select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
}
.radio-group {
  display: flex;
  gap: 1.25rem;
  margin-top: 0.25rem;
}
.radio-group label {
  font-weight: normal;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

/* Tables */
.table-wrapper {
  overflow-x: auto;
  margin: 1rem 0;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
}
.data-table th, .data-table td {
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
  vertical-align: middle;
}
.data-table th {
  background-color: #f9fafb;
  font-weight: 600;
  text-align: center;
}
.data-table input, .data-table select {
  width: 100%;
  padding: 0.25rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}
.data-table input:focus, .data-table select:focus {
  border-color: #3b82f6;
}
.text-center { text-align: center; }
.text-muted { color: #9ca3af; }

/* Buttons */
.btn-add, .btn-remove, .btn-reset, .btn-submit {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-add {
  background-color: #16a34a;
  color: white;
}
.btn-add:hover { background-color: #15803d; }
.btn-remove {
  background-color: #ef4444;
  color: white;
  padding: 0.25rem 0.5rem;
}
.btn-remove:hover { background-color: #dc2626; }
.btn-reset {
  background-color: #6b7280;
  color: white;
}
.btn-reset:hover { background-color: #4b5563; }
.btn-submit {
  background-color: #2563eb;
  color: white;
  font-weight: bold;
}
.btn-submit:hover { background-color: #1d4ed8; }

.declaration-box {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}
.declaration-box label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}
.declaration-box input {
  margin-top: 0.2rem;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.note {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.footer-note {
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
  margin-top: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
  .section-title {
    flex-direction: column;
    align-items: flex-start;
  }
  .form-actions {
    flex-direction: column;
    align-items: center;
  }
  .btn-reset, .btn-submit {
    width: 100%;
    justify-content: center;
  }
}
</style>