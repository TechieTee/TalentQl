const startApp = async () => {
  let currentPage = 1;
  const prevBtn = document.querySelector('[data-prevbtn=""]');
  const nextBtn = document.querySelector('[data-nextbtn=""]');

  const fetchPage = async (page: number) => {
    const response = await fetch(
      `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${page}`
    );
    const json = await response.json();

    return json.results[0];
  };

  const setData = (data: any[], page: number) => {
    const li = data?.reduce((prev, curr) => {
      return (
        prev +
        `<tr data-entryid=${curr?.id}>
          <td>${curr.row}</td>
          <td>${curr.gender}</td>
          <td>${curr.age} </td>
        </tr>`
      );
    }, "");

    const tBodyElement = document.querySelector('[data-sink=""]');
    if (tBodyElement) tBodyElement.innerHTML = li;

    const pageLabelElement = document.querySelector('[data-pageview=""]');
    if (pageLabelElement) pageLabelElement.textContent = `Showing Page ${page}`;

    if (page === 1) prevBtn?.setAttribute("disabled", "true");
    else prevBtn?.removeAttribute("disabled");
  };

  nextBtn?.addEventListener("click", async () => {
    const page = currentPage + 1;
    currentPage = page;
    const data = await fetchPage(page);
    if (data && data[page] && page === currentPage) {
      setData(data[page], page);
    }
  });

  prevBtn?.addEventListener("click", async () => {
    const page = currentPage - 1;
    currentPage = page;
    if (page < 1) return;
    const data = await fetchPage(page);
    if (data && data[page] && page === currentPage) {
      setData(data[page], page);
    }
  });

  const data = await fetchPage(1);
  setData(data["1"], 1);
};

document.addEventListener("DOMContentLoaded", startApp);
