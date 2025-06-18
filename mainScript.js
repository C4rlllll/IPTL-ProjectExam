const maxSenators = 12;

document.querySelectorAll('input[name="senators"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const selected = document.querySelectorAll(
      'input[name="senators"]:checked'
    );
    if (selected.length > maxSenators) {
      checkbox.checked = false;
      alert(`You can only select up to ${maxSenators} senators.`);
    }
  });
});

document.getElementById("voteForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const president = document.querySelector(
    'input[name="president"]:checked'
  )?.value;
  const vp = document.querySelector(
    'input[name="vicepresident"]:checked'
  )?.value;
  const senators = Array.from(
    document.querySelectorAll('input[name="senators"]:checked')
  ).map((c) => c.value);
  const partylist = document.querySelector(
    'input[name="partylist"]:checked'
  )?.value;

  const confirmation = confirm(
    `Confirm your vote:\nPresident: ${president}\nVice President: ${vp}\nSenators: ${senators.join(
      ", "
    )}\nPartylist: ${partylist}`
  );

  if (confirmation) {
    downloadReceipt(president, vp, senators, partylist);
    alert("Vote submitted. Logging out...");
    window.location.href = "index.html";
  }
});

function downloadReceipt(president, vp, senators, partylist) {
  const line = "------------------------------------------";
  const text = `
         🗳️ OFFICIAL VOTING RECEIPT 🗳️
${line}
👤 President:        ${president}
👤 Vice President:   ${vp}
🏛️ Senators:
   - ${senators.join("\n   - ")}
📢 Partylist:        ${partylist}
${line}
Thank you for voting responsibly!
  `;

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vote_receipt.txt";
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("fullName");
  if (name) {
    document.getElementById("welcomeMessage").textContent = `Welcome, ${name}`;
  }
});
