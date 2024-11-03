// Prompt to choose folder
// 사용자에게 이미지가 있는 폴더를 선택하도록 요청하는 대화 상자를 띄웁니다.
var inputFolder = Folder.selectDialog("Select the folder containing your images");

// Set canvas size
// 캔버스의 너비와 높이를 설정하도록 사용자에게 입력을 요청합니다.
// 기본값은 각각 512로 설정되어 있습니다.
var canvasWidth = prompt("Enter canvas width:", "512");
var canvasHeight = prompt("Enter canvas height:", "512");

// Create a new document
// 사용자가 지정한 너비와 높이로 새 문서를 생성합니다.
// 해상도는 72 DPI로 설정하고, 문서 이름을 "Loaded Layers Document"로 지정합니다.
var doc = app.documents.add(Number(canvasWidth), Number(canvasHeight), 72, "Loaded Layers Document");

// Check if folder was selected
// 폴더가 선택되었는지 확인하고, 선택된 경우 실행을 계속합니다.
if (inputFolder != null) {

    // Get all image files in the folder
    // 선택한 폴더에서 jpg, tif, png, psd 파일 확장자와 일치하는 모든 파일을 가져옵니다.
    var files = inputFolder.getFiles(/\.(jpg|tif|png|psd)$/i);

    // Loop through each file
    // 폴더 내의 각 파일을 순회하며 작업을 수행합니다.
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Place file as embedded smart object
        // 파일을 임베디드 스마트 오브젝트로 문서에 추가합니다.
        var idPlc = charIDToTypeID("Plc "); // "Plc "는 Photoshop에서 파일을 배치하는 동작입니다.
        var desc2 = new ActionDescriptor();
        desc2.putPath(charIDToTypeID("null"), new File(file)); // 파일 경로를 설정합니다.
        desc2.putEnumerated(charIDToTypeID("FTcs"), charIDToTypeID("QCSt"), charIDToTypeID("Qcsa")); // 파일을 화면 중앙에 배치합니다.
        executeAction(idPlc, desc2, DialogModes.NO); // 파일 배치를 실행하고, 대화 상자를 표시하지 않습니다.
    }
}
