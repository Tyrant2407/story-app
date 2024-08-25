import "../../../sass/dashboard.scss";
import "../../../sass/main.scss";
import footer from "../components/AppBar/footer";

const Dashboard = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    try {
      const fetchRecords = await fetch('/data/DATA.json');
      const responseRecords = await fetchRecords.json();
      this._userListStory = responseRecords.listStory || []; // Sesuaikan dengan struktur data
      this._populateListRecordToTable(this._userListStory);
      this._populateListDataToCard(this._userListStory);
    } catch (error) {
      console.error('Failed to fetch and initialize data:', error);
    }
  },

  _populateListDataToCard(listStory = []) {
    if (!Array.isArray(listStory)) {
      throw new Error('Parameter listStory should be an array.');
    }

    const cardContainer = document.querySelector('#recordsCard');
    cardContainer.classList.add('card-container');
    cardContainer.innerHTML = ''; // Kosongkan container sebelum menambahkan card baru

    listStory.forEach(storyRecord => {
      const cardTemplate = `
        <div class="card" style="width: 18rem;">
          <img src="${storyRecord.photoUrl}" class="card-img-top" alt="card-image">
          <div class="card-body">
            <h5 class="card-title">${storyRecord.name} | ${new Date(storyRecord.createdAt).toLocaleDateString()}</h5>
            <p class="card-text">${storyRecord.description}</p>
            <a class="btn btn-sm btn-warning" href="/story/edit.html?id=${storyRecord.id}">
              <i class="bi bi-pen-fill me-1"></i>Edit
            </a>
          </div>
        </div>
      `;
      cardContainer.innerHTML += cardTemplate;
    });
  },

  _populateListRecordToTable(listStory = []) {
    if (!Array.isArray(listStory)) {
      throw new Error('Parameter listStory should be an array.');
    }

    const recordBodyTable = document.querySelector('#recordsTable tbody');

    recordBodyTable.innerHTML = '';
    if (listStory.length === 0) {
      recordBodyTable.innerHTML = this._templateEmptyBodyTable();
      return;
    }

    listStory.forEach((item, idx) => {
      recordBodyTable.innerHTML += this._templateBodyTable(idx, item);
    });
  },

  _templateBodyTable(index, storyRecord) {
    return `
      <tr>
        <th class="text-center">${index + 1}</th>
        <td>${storyRecord.name}</td>
        <td>${storyRecord.description}</td>
        <td><img src="${storyRecord.photoUrl}" alt="${storyRecord.name}" style="width: 100px;"></td>
        <td>${new Date(storyRecord.createdAt).toLocaleDateString()}</td>
        <td>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <a class="btn btn-sm btn-primary" href="#">
              <i class="bi bi-eye-fill me-1"></i>Show
            </a>
            <a class="btn btn-sm btn-warning" href="/story/edit.html?id=${storyRecord.id}">
              <i class="bi bi-pen-fill me-1"></i>Edit
            </a>
            <a class="btn btn-sm btn-danger" href="#">
              <i class="bi bi-trash3-fill me-1"></i>Delete
            </a>
          </div>
        </td>
      </tr>
    `;
  },

  _templateEmptyBodyTable() {
    const recordHeadTable = document.querySelector('#recordsTable thead');

    return `
      <tr>
        <td colspan="${recordHeadTable.querySelectorAll('td,th').length}">
          <div class="text-center">Tidak ada catatan transaksi</div>
        </td>
      </tr>
    `;
  },
};

export default Dashboard;