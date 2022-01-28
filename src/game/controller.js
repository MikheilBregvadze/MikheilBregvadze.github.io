// import { View } from "./view";
class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;
        
        this.model.init();
        this.view.drawChessBackground();
        this.view.drawCheckers(this.model.boardInfo);
        this.view.bindToggleChecker(this.setActiveCheckerInfo);
        this.model.bindBoardChanged(this.onBoardChanged);

        this.onBoardChanged(this.model.boardInfo);
    }

    setActiveCheckerInfo = result => {
        this.model.setSelectedCheckerPosition(result);
        this.onBoardChanged(this.model.boardInfo, this.model.activeFreeSeats);
    }

    onBoardChanged = (board, activeFreeSeats) => {
        this.view.drawActiveFreeSeats(activeFreeSeats);
        this.view.drawCheckerMove(this.model.moveChecker);
    }
}