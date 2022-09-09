const startApp = async () => {
  let pageData;
  let currentPage = 1;

  const fetchPage = async (page: number) => {
    const response = await fetch(
      `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${page}`
    );
    const json = await response.json();

    return json.results?.[0];
  };

  const setData = (data: any[]) => {
    const li = data.reduce((prev, curr) => {
      return (
        prev +
        `<tr>
        <td>${curr.row}</td>
        <td>${curr.gender}</td>
        <td>${curr.age} </td>
      </tr>`
      );
    }, "");

    const tBodyElement = document.querySelector('[data-sink=""]');
    if (tBodyElement) tBodyElement.innerHTML = li;

    const pageLabelElement = document.querySelector('[data-pageview=""]');
    if (pageLabelElement)
      pageLabelElement.textContent = `Showing Page ${currentPage}`;
  };

  const nextBtn = document.querySelector('[data-nextbtn=""]');
  nextBtn?.addEventListener("click", async () => {
    const nextPage = (currentPage + 1).toString();
    const pages = Object.keys(pageData);
    if (pages.includes(nextPage)) {
      currentPage += 1;
      setData(pageData[nextPage]);
    } else {
      const data = await fetchPage(currentPage + 1);
      pageData = data;
      currentPage += 1;
      setData(pageData[currentPage]);
    }
  });

  const prevBtn = document.querySelector('[data-prevbtn=""]');
  prevBtn?.addEventListener("click", async () => {
    const prevPage = (currentPage - 1).toString();
    const pages = Object.keys(pageData);
    if (pages.includes(prevPage)) {
      currentPage -= 1;
      setData(pageData[prevPage]);
    } else {
      const data = await fetchPage(currentPage - 1);
      pageData = data;
      currentPage -= 1;
      setData(pageData[currentPage]);
    }
  });

  const data = await fetchPage(1);
  pageData = data;
  setData(pageData[currentPage]);
};

document.addEventListener("DOMContentLoaded", startApp);
