const cleanOCRData = (text) => {
  text = text.replace(/[\u{0080}-\u{FFFF}]/gu, "");
  var changedText = "";
  for (var i = 0; i < text.length - 5; i++) {
    var tempString =
      text[i] +
      text[i + 1] +
      text[i + 2] +
      text[i + 3] +
      text[i + 4] +
      text[i + 5];
    if (tempString === "Expiry") {
      changedText = changedText + tempString;
      break;
    } else changedText = changedText + text[i];
  }
  changedText = changedText.trim();
  var idNo = "";
  var lastUsed = 0;
  for (i = 0; i < changedText.length; i++) {
    if (
      !changedText[i].match(/[a-z]/i) &&
      changedText[i] !== "\n" &&
      changedText[i] !== " "
    ) {
      while (changedText[i] !== "\n") {
        lastUsed = i;
        idNo = idNo + changedText[i];
        i++;
      }
      break;
    }
  }
  changedText = changedText.substring(lastUsed + 1);
  changedText = changedText.trim();
  var name = "";

  for (i = 0; i < changedText.length; i++) {
    var temp =
      changedText[i] +
      changedText[i + 1] +
      changedText[i + 2] +
      changedText[i + 3];
    if (temp.toLocaleLowerCase() === "name") {
      i = i + 4;
      while (changedText[i] !== "\n") {
        name += changedText[i];
        i++;
        lastUsed = i;
      }
      break;
    }
  }

  name = name.trim();
  changedText = changedText.substring(lastUsed + 1);
  console.log(changedText);

  var lastName = "";

  for (i = 0; i < changedText.length; i++) {
    temp =
      changedText[i] +
      changedText[i + 1] +
      changedText[i + 2] +
      changedText[i + 3];
    if (temp.toLocaleLowerCase() === "name") {
      i = i + 4;
      while (changedText[i] !== "\n") {
        lastName += changedText[i];
        i++;
        lastUsed = i;
      }
      break;
    }
  }

  lastName = lastName.trim();
  changedText = changedText.substring(lastUsed + 1);

  console.log(idNo);
  console.log(name);
  console.log(lastName);
  console.log(changedText);

  var stringArray = [];
  temp = "";

  for (i = 0; i < changedText.length; i++) {
    if (changedText[i] === "\n") {
      if (temp.length) stringArray.push(temp);
      temp = "";
    } else temp += changedText[i];
  }

  var newArray = [];

  for (i = 0; i < stringArray.length; i++) {
    var cnt1 = 0;
    var cnt2 = 0;

    for (var j = 0; j < stringArray[i].length; j++) {
      if (stringArray[i][j].match(/[a-z]/i)) cnt1++;
      else if (stringArray[i][j] >= "0" && stringArray[i][j] <= "9") cnt2++;
    }

    if (cnt1 && cnt2 && stringArray[i].length >= 8) {
      for (j = stringArray[i].length - 1; j >= 0; j--) {
        console.log(
          stringArray[i][j] +
            stringArray[i][j - 1] +
            stringArray[i][j - 2] +
            stringArray[i][j - 3]
        );
        if (
          stringArray[i][j] !== " " &&
          stringArray[i][j - 1] !== " " &&
          stringArray[i][j - 2] !== " " &&
          stringArray[i][j - 3] !== " "
        ) {
          console.log(j);
          stringArray[i] = stringArray[i].substring(0, j + 1);
          break;
        }
      }
      temp = "";
      var flag = false;
      for (j = 0; j < stringArray[i].length; j++) {
        if (stringArray[i][j] >= "0" && stringArray[i][j] <= "9") flag = true;
        if (flag) temp = temp + stringArray[i][j];
      }
      temp = temp.trim();
      newArray.push(temp);
    }
  }

  console.log(stringArray);
  console.log(newArray);
  var finalData = {};
  finalData["Identification Number"] = idNo;
  finalData["Name"] = name;
  finalData["Last Name"] = lastName;
  finalData["Birth Date"] = newArray[0];
  finalData["Date of Issue"] = newArray[1];
  finalData["Date of Expiry"] = newArray[2];
  console.log(finalData);

  return finalData;
};

export default cleanOCRData;
