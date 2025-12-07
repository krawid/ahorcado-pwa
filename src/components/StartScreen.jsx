import { useState, useEffect, useRef } from 'react';
import { getCategories } from '../utils/wordBankManager.js';
import { announceToScreenReader, trapFocusInModal, releaseFocusTrap } from '../utils/ariaUtils.js';
import './StartScreen.css';

/**
 * Componente de pantalla de inicio
 * Muestra configuración actual y permite iniciar juego o cambiar ajustes
 */
export default function StartScreen({ 
  category, 
  difficulty, 
  onStartGame, 
  onChangeCategory, 
  onChangeDifficulty,
  onManageWords 
}) {
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showDifficultyDialog, setShowDifficultyDialog] = useState(false);
  const [categories, setCategories] = useState([]);

  const categoryDialogRef = useRef(null);
  const difficultyDialogRef = useRef(null);

  const difficulties = ['Fácil', 'Normal', 'Difícil'];

  // Cargar categorías disponibles
  useEffect(() => {
    const availableCategories = getCategories();
    setCategories(availableCategories);
  }, []);

  // Manejar tecla Escape para cerrar diálogos
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showCategoryDialog) {
          handleCloseCategoryDialog();
        }
        if (showDifficultyDialog) {
          handleCloseDifficultyDialog();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCategoryDialog, showDifficultyDialog]);

  const handleStartGame = () => {
    announceToScreenReader('Iniciando nuevo juego', 'polite');
    onStartGame();
  };

  const handleOpenCategoryDialog = () => {
    setShowCategoryDialog(true);
    announceToScreenReader('Diálogo de selección de categoría abierto', 'assertive');
  };

  const handleOpenDifficultyDialog = () => {
    setShowDifficultyDialog(true);
    announceToScreenReader('Diálogo de selección de dificultad abierto', 'assertive');
  };

  const handleCloseCategoryDialog = () => {
    setShowCategoryDialog(false);
    releaseFocusTrap();
    announceToScreenReader('Diálogo cerrado', 'polite');
  };

  const handleCloseDifficultyDialog = () => {
    setShowDifficultyDialog(false);
    releaseFocusTrap();
    announceToScreenReader('Diálogo cerrado', 'polite');
  };

  const handleSelectCategory = (selectedCategory) => {
    onChangeCategory(selectedCategory);
    releaseFocusTrap();
    setShowCategoryDialog(false);
    announceToScreenReader(`Categoría cambiada a ${selectedCategory}`, 'assertive');
  };

  const handleSelectDifficulty = (selectedDifficulty) => {
    onChangeDifficulty(selectedDifficulty);
    releaseFocusTrap();
    setShowDifficultyDialog(false);
    announceToScreenReader(`Dificultad cambiada a ${selectedDifficulty}`, 'assertive');
  };

  // Capturar foco cuando se abre el diálogo de categoría
  useEffect(() => {
    if (showCategoryDialog && categoryDialogRef.current) {
      trapFocusInModal(categoryDialogRef.current);
    }
  }, [showCategoryDialog]);

  // Capturar foco cuando se abre el diálogo de dificultad
  useEffect(() => {
    if (showDifficultyDialog && difficultyDialogRef.current) {
      trapFocusInModal(difficultyDialogRef.current);
    }
  }, [showDifficultyDialog]);

  return (
    <div className="start-screen" role="main">
      <h1 className="game-title">Juego del Ahorcado</h1>

      <div className="settings-display" role="region" aria-label="Configuración actual del juego">
        <div className="setting-item">
          <span className="setting-label">Categoría:</span>
          <span className="setting-value" aria-label={`Categoría actual: ${category}`}>
            {category}
          </span>
        </div>

        <div className="setting-item">
          <span className="setting-label">Dificultad:</span>
          <span className="setting-value" aria-label={`Dificultad actual: ${difficulty}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <div className="button-group">
        <button
          className="btn btn-primary btn-large"
          onClick={handleStartGame}
          aria-label="Iniciar nuevo juego"
        >
          Jugar
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleOpenCategoryDialog}
          aria-label="Cambiar categoría"
        >
          Cambiar Categoría
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleOpenDifficultyDialog}
          aria-label="Cambiar dificultad"
        >
          Cambiar Dificultad
        </button>

        <button
          className="btn btn-secondary"
          onClick={onManageWords}
          aria-label="Gestionar palabras personalizadas"
        >
          Gestionar Palabras
        </button>
      </div>

      {/* Diálogo de selección de categoría */}
      {showCategoryDialog && (
        <div 
          className="dialog-overlay" 
          onClick={handleCloseCategoryDialog}
          role="presentation"
        >
          <div 
            ref={categoryDialogRef}
            className="dialog" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="category-dialog-title"
            aria-modal="true"
          >
            <h2 id="category-dialog-title">Seleccionar Categoría</h2>
            
            <div className="dialog-content">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`dialog-option ${cat === category ? 'selected' : ''}`}
                  onClick={() => handleSelectCategory(cat)}
                  aria-label={`Seleccionar categoría ${cat}${cat === category ? ' (actual)' : ''}`}
                  aria-pressed={cat === category}
                >
                  {cat}
                  {cat === category && <span className="checkmark" aria-hidden="true"> ✓</span>}
                </button>
              ))}
            </div>

            <button
              className="btn btn-secondary dialog-close"
              onClick={handleCloseCategoryDialog}
              aria-label="Cerrar diálogo"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Diálogo de selección de dificultad */}
      {showDifficultyDialog && (
        <div 
          className="dialog-overlay" 
          onClick={handleCloseDifficultyDialog}
          role="presentation"
        >
          <div 
            ref={difficultyDialogRef}
            className="dialog" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="difficulty-dialog-title"
            aria-modal="true"
          >
            <h2 id="difficulty-dialog-title">Seleccionar Dificultad</h2>
            
            <div className="dialog-content">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  className={`dialog-option ${diff === difficulty ? 'selected' : ''}`}
                  onClick={() => handleSelectDifficulty(diff)}
                  aria-label={`Seleccionar dificultad ${diff}${diff === difficulty ? ' (actual)' : ''}`}
                  aria-pressed={diff === difficulty}
                >
                  {diff}
                  {diff === difficulty && <span className="checkmark" aria-hidden="true"> ✓</span>}
                </button>
              ))}
            </div>

            <div className="difficulty-info" role="note" aria-label="Información sobre niveles de dificultad">
              <p><strong>Fácil:</strong> 8 intentos</p>
              <p><strong>Normal:</strong> 6 intentos</p>
              <p><strong>Difícil:</strong> 4 intentos</p>
            </div>

            <button
              className="btn btn-secondary dialog-close"
              onClick={handleCloseDifficultyDialog}
              aria-label="Cerrar diálogo"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
